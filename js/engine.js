/**
 * CutsceneEngine — Main game loop, action sequencing, input handling.
 */
const CutsceneEngine = (() => {
  let script = null;
  let sceneIndex = 0;
  let actionIndex = 0;
  let running = false;
  let lastTime = 0;
  let animFrame = 0;
  let animTimer = 0;
  const ANIM_INTERVAL = 500; // ms per sprite frame toggle

  // Active characters on screen
  const characters = {};

  // Remap landscape-canonical coordinates to current mode
  // Landscape reference: 256x224. Portrait: 144x256.
  // Non-linear: center-biased so characters don't clip off edges
  function remapPosition(x, y) {
    const L = Renderer.getLayout();
    const refW = 256, refH = 224;
    if (L.width === refW && L.height === refH) return { x, y };

    // X: proportional remap with center bias
    const xNorm = x / refW;
    const xCentered = (xNorm - 0.5) * 0.8 + 0.5;
    const newX = Math.round(Math.max(2, Math.min(L.width - 2, xCentered * L.width)));

    // Y: map relative to horizon, then stretch the ground area
    // Landscape: horizon=120, bottom=224. Portrait: horizon=90, bottom=256.
    const refHorizon = 120;
    if (y < refHorizon) {
      const t = y / refHorizon;
      return { x: newX, y: Math.round(t * L.horizon) };
    } else {
      // Ground area: proportionally spread across the taller portrait ground
      const refGroundRange = refH - refHorizon; // 104
      const newGroundRange = L.height - L.horizon; // 166
      const t = (y - refHorizon) / refGroundRange;
      const newY = Math.round(L.horizon + t * newGroundRange);
      return { x: newX, y: Math.min(newY, L.height - 10) };
    }
  }

  // Current state
  let currentBackground = null;
  let waitingForInput = false;
  let waitTimer = 0;
  let currentActionTween = null;
  let activeEmote = null;
  let sceneElapsed = 0; // ms since scene started, for timecodes
  let emoteTimer = 0;

  // Input state
  let advancePressed = false;
  let skipPressed = false;
  let autoAdvance = false; // auto-advance dialogue (for video export)
  let autoAdvanceDelay = 2000; // ms to show completed dialogue before advancing
  let autoAdvanceTimer = 0;
  let onCompleteCallback = null;

  const { getInternalSize } = Renderer;

  function getOffscreenPos(direction) {
    const size = getInternalSize();
    switch (direction) {
      case 'left': return { x: -36, y: null };
      case 'right': return { x: size.width + 4, y: null };
      case 'top': return { x: null, y: -52 };
      case 'bottom': return { x: null, y: size.height + 4 };
      default: return { x: -20, y: null };
    }
  }

  function getOrCreateCharacter(charId) {
    if (!characters[charId]) {
      const def = script.characters[charId];
      characters[charId] = {
        id: charId,
        sprite: def.sprite,
        name: def.name,
        nameColor: def.nameColor,
        x: 0, y: 0,
        baseX: 0, baseY: 0, // home position for milling
        visible: false,
        idleSeed: Math.random() * 1000, // unique per character for varied idle
        milling: false, // wandering around
        dancing: false, // active dancing
        pinned: false, // stays at position, ignores mill/dance
      };
    }
    return characters[charId];
  }

  // --- Action processors ---

  function beginAction(action) {
    switch (action.type) {
      case 'transition':
        return beginTransition(action);
      case 'enter':
        return beginEnter(action);
      case 'exit':
        return beginExit(action);
      case 'dialogue':
        return beginDialogue(action);
      case 'wait':
        return beginWait(action);
      case 'shake':
        return beginShake(action);
      case 'emote':
        return beginEmote(action);
      case 'move':
        return beginMove(action);
      case 'setBackground':
        return beginSetBackground(action);
      case 'title':
        return beginTitle(action);
      case 'credits':
        return beginCredits(action);
      case 'mill':
        return beginMill(action);
      case 'dance':
        return beginDance(action);
      case 'joinDance':
        return beginJoinDance(action);
      case 'stopDance':
        return beginStopDance(action);
      case 'showNotes':
        return beginShowNotes(action);
      case 'hideNotes':
        return beginHideNotes(action);
      case 'setScale':
        return beginSetScale(action);
      case 'ufoArrive':
        return beginUfoArrive(action);
      case 'ufoDepart':
        return beginUfoDepart(action);
      case 'pin':
        return beginPin(action);
      case 'unpin':
        return beginUnpin(action);
      case 'showProp':
        return beginShowProp(action);
      case 'hideProp':
        return beginHideProp(action);
      default:
        return { done: true };
    }
  }

  function beginTransition(action) {
    const duration = action.duration || 1000;
    if (action.effect === 'fadeIn') {
      AnimationSystem.startFade(1.0, 0.0, duration);
    } else if (action.effect === 'fadeOut') {
      AnimationSystem.startFade(0.0, 1.0, duration);
    } else if (action.effect === 'cut') {
      return { done: true };
    }
    waitTimer = duration;
    return { done: false, type: 'timed' };
  }

  function beginEnter(action) {
    const char = getOrCreateCharacter(action.character);
    const from = getOffscreenPos(action.from || 'left');
    const rawTo = action.to || { x: 128, y: 120 };
    const to = remapPosition(rawTo.x, rawTo.y);
    // Push base position away from fire if too close
    const fL = Renderer.getLayout();
    const tdx = to.x + SpriteLibrary.W / 2 - fL.fireX;
    const tdy = to.y + SpriteLibrary.H * 0.7 - fL.fireY;
    const tdist = Math.sqrt(tdx * tdx + tdy * tdy);
    if (tdist < 40 && tdist > 0) {
      to.x = fL.fireX + (tdx / tdist) * 40 - SpriteLibrary.W / 2;
      to.y = fL.fireY + (tdy / tdist) * 40 - SpriteLibrary.H * 0.7;
    }
    const duration = action.duration || 800;

    char.x = from.x !== null ? from.x : to.x;
    char.y = from.y !== null ? from.y : to.y;
    char.baseX = to.x;
    char.baseY = to.y;
    char.visible = true;

    AnimationSystem.addTween(char, 'x', char.x, to.x, duration, 'easeOut');
    AnimationSystem.addTween(char, 'y', char.y, to.y, duration, 'easeOut');

    // Non-blocking: tween runs in background, engine continues immediately
    return { done: true };
  }

  function beginExit(action) {
    const char = getOrCreateCharacter(action.character);
    const toDir = getOffscreenPos(action.to || 'right');
    const duration = action.duration || 800;

    const targetX = toDir.x !== null ? toDir.x : char.x;
    const targetY = toDir.y !== null ? toDir.y : char.y;

    AnimationSystem.addTween(char, 'x', char.x, targetX, duration, 'easeIn');
    AnimationSystem.addTween(char, 'y', char.y, targetY, duration, 'easeIn');

    // Non-blocking: tween runs in background, hide after duration
    setTimeout(() => { char.visible = false; }, duration);
    return { done: true };
  }

  function beginDialogue(action) {
    const charDef = script.characters[action.character];
    const maxWidth = Renderer.getTextMaxWidth();
    const scale = Renderer.getTextScale();
    const speed = script.settings.textSpeed || 30;

    AnimationSystem.startTypewriter(action.text, speed, maxWidth, scale);
    waitingForInput = true;

    return { done: false, type: 'dialogue', character: action.character };
  }

  function beginWait(action) {
    waitTimer = action.duration || 500;
    return { done: false, type: 'timed' };
  }

  function beginShake(action) {
    AnimationSystem.startShake(action.intensity || 3, action.duration || 500);
    waitTimer = action.duration || 500;
    return { done: false, type: 'timed' };
  }

  function beginEmote(action) {
    const char = getOrCreateCharacter(action.character);
    activeEmote = { character: char, emote: action.emote || 'surprise' };
    emoteTimer = action.duration || 1500;
    waitTimer = emoteTimer;
    return { done: false, type: 'timed', onDone: () => { activeEmote = null; } };
  }

  function beginMove(action) {
    const char = getOrCreateCharacter(action.character);
    const rawTo = action.to || { x: char.x, y: char.y };
    const to = remapPosition(rawTo.x, rawTo.y);
    const duration = action.duration || 600;

    AnimationSystem.addTween(char, 'x', char.x, to.x, duration, 'linear');
    AnimationSystem.addTween(char, 'y', char.y, to.y, duration, 'linear');

    waitTimer = duration;
    return { done: false, type: 'timed' };
  }

  function beginSetBackground(action) {
    currentBackground = action.background;
    return { done: true };
  }

  // Title/credits overlay state
  let titleOverlay = null;
  let creditsOverlay = null;

  function beginTitle(action) {
    const duration = action.duration || 4000;
    const fadeIn = action.fadeIn || 800;
    const fadeOut = action.fadeOut || 800;
    titleOverlay = {
      text: action.text || '',
      subtitle: action.subtitle || '',
      color: action.color || '#ffffff',
      subtitleColor: action.subtitleColor || '#8888cc',
      duration: duration,
      fadeIn: fadeIn,
      fadeOut: fadeOut,
      elapsed: 0,
    };
    waitTimer = duration;
    return { done: false, type: 'timed', onDone: () => { titleOverlay = null; } };
  }

  function beginCredits(action) {
    const lines = action.lines || [];
    const speed = action.speed || 30; // pixels per second
    const totalHeight = lines.length * 14 + Renderer.getInternalSize().height;
    const duration = (totalHeight / speed) * 1000;
    creditsOverlay = {
      lines: lines,
      color: action.color || '#cccccc',
      highlightColor: action.highlightColor || '#ffffff',
      speed: speed,
      elapsed: 0,
      duration: duration,
    };
    waitTimer = duration;
    return { done: false, type: 'timed', onDone: () => { creditsOverlay = null; } };
  }

  // --- Main loop ---

  // Mill: characters wander near their base position
  function beginMill(action) {
    for (const char of Object.values(characters)) {
      if (char.visible && !char.pinned) char.milling = true;
    }
    return { done: true };
  }

  // Dance: characters orbit/move in coordinated patterns
  let danceActive = false;
  let danceElapsed = 0;

  function beginDance(action) {
    danceActive = true;
    danceElapsed = 0;
    // If no specific characters listed, everyone joins
    for (const char of Object.values(characters)) {
      if (char.visible && !char.pinned) {
        char.dancing = true;
        char.milling = false;
      }
    }
    return { done: true };
  }

  function beginJoinDance(action) {
    danceActive = true;
    const char = getOrCreateCharacter(action.character);
    if (!char.pinned) {
      char.dancing = true;
      char.milling = false;
    }
    return { done: true };
  }

  function beginStopDance(action) {
    danceActive = false;
    for (const char of Object.values(characters)) {
      char.dancing = false;
      char.milling = false;
    }
    return { done: true };
  }

  // Music notes state
  let notesActive = false;
  let notesCharId = null;

  function beginShowNotes(action) {
    notesActive = true;
    notesCharId = action.character || null;
    return { done: true };
  }

  function beginHideNotes(action) {
    notesActive = false;
    notesCharId = null;
    return { done: true };
  }

  // Scale a character
  function beginSetScale(action) {
    const char = getOrCreateCharacter(action.character);
    // Use layout scale for Lyra, script scale for others
    if (action.character === 'lyra') {
      const L = Renderer.getLayout();
      char.renderScale = L.lyraScale || action.scale || 1;
    } else {
      char.renderScale = action.scale || 1;
    }
    return { done: true };
  }

  // Props on screen
  const activeProps = [];

  // UFO state
  let ufoState = null; // { x, y, phase, elapsed, duration, targetX, targetY, character, beamOn }

  function beginUfoArrive(action) {
    const char = getOrCreateCharacter(action.character);
    const L = Renderer.getLayout();
    let targetX, targetY;
    // Lyra uses layout position directly (she's on the deck)
    if (action.character === 'lyra') {
      targetX = L.lyraX;
      targetY = L.lyraY;
    } else {
      const rawX = action.to ? action.to.x : 128;
      const rawY = action.to ? action.to.y : 120;
      const pos = remapPosition(rawX, rawY);
      targetX = pos.x;
      targetY = pos.y;
    }
    const duration = action.duration || 5000;
    char.visible = false;
    ufoState = {
      x: -60, y: 15,
      targetX: targetX, targetY: targetY,
      phase: 'flyIn', elapsed: 0, duration: duration,
      character: action.character, beamOn: false,
    };
    waitTimer = duration;
    return { done: false, type: 'timed', onDone: () => {
      char.x = targetX;
      char.y = targetY;
      char.baseX = targetX;
      char.baseY = targetY;
      char.visible = true;
      ufoState = null;
    }};
  }

  function beginUfoDepart(action) {
    const char = action.character ? characters[action.character] : null;
    const duration = action.duration || 5000;
    const L = Renderer.getLayout();
    const charX = char ? char.x : L.lyraX;
    const charY = char ? char.y : L.lyraY;
    ufoState = {
      x: L.width + 20, y: 15,
      targetX: charX, targetY: charY,
      phase: 'flyIn', elapsed: 0, duration: duration,
      character: action.character, beamOn: false,
      departing: true,
    };
    waitTimer = duration;
    return { done: false, type: 'timed', onDone: () => {
      if (char) char.visible = false;
      ufoState = null;
    }};
  }

  function updateUfo(dt) {
    if (!ufoState) return;
    ufoState.elapsed += dt;
    const t = ufoState.elapsed;
    const d = ufoState.duration;
    const progress = Math.min(t / d, 1);

    const W = Renderer.getInternalSize().width;

    if (!ufoState.departing) {
      // Arrive: fly in (0-30%), hover + beam down (30-80%), fly away (80-100%)
      if (progress < 0.3) {
        const p = progress / 0.3;
        ufoState.x = -60 + (ufoState.targetX - 10 + 60) * p;
        ufoState.y = 10 + Math.sin(p * Math.PI) * -10;
        ufoState.beamOn = false;
      } else if (progress < 0.8) {
        ufoState.x = ufoState.targetX - 10;
        ufoState.y = 10;
        ufoState.beamOn = true;
        const beamP = (progress - 0.3) / 0.5;
        if (beamP > 0.2 && ufoState.character) {
          const char = characters[ufoState.character];
          if (char) {
          char.visible = true;
          // Slide down from UFO to target position
          const slideP = Math.min(1, (beamP - 0.2) / 0.7);
          const ufoBottom = 25; // just below UFO body
          char.x = ufoState.targetX;
          char.y = ufoBottom + (ufoState.targetY - ufoBottom) * slideP;
          char.baseX = ufoState.targetX;
          char.baseY = ufoState.targetY;
          }
        }
      } else {
        const p = (progress - 0.8) / 0.2;
        ufoState.x = (ufoState.targetX - 10) + (W + 20 - ufoState.targetX) * p;
        ufoState.y = 10 - p * 30;
        ufoState.beamOn = false;
      }
    } else {
      // Depart: fly in (0-25%), hover + beam up (25-75%), fly away (75-100%)
      if (progress < 0.25) {
        const p = progress / 0.25;
        ufoState.x = (W + 20) - (W + 20 - ufoState.targetX + 10) * p;
        ufoState.y = -20 + 30 * p;
        ufoState.beamOn = false;
      } else if (progress < 0.75) {
        ufoState.x = ufoState.targetX - 10;
        ufoState.y = 10;
        ufoState.beamOn = true;
        const beamP = (progress - 0.25) / 0.5;
        if (ufoState.character) {
          const char = characters[ufoState.character];
          if (char) {
            // Slide up from target position to UFO
            const slideP = Math.min(1, beamP / 0.8);
            const ufoBottom = 25;
            char.x = ufoState.targetX;
            char.y = ufoState.targetY + (ufoBottom - ufoState.targetY) * slideP;
            if (slideP >= 1) char.visible = false;
          }
        }
      } else {
        const p = (progress - 0.75) / 0.25;
        ufoState.x = (ufoState.targetX - 10) - 60 * p;
        ufoState.y = 10 - p * 50;
        ufoState.beamOn = false;
        if (ufoState.character) {
          const char = characters[ufoState.character];
          if (char) char.visible = false;
        }
      }
    }
  }

  function beginPin(action) {
    const char = getOrCreateCharacter(action.character);
    char.pinned = true;
    return { done: true };
  }

  function beginUnpin(action) {
    const char = getOrCreateCharacter(action.character);
    char.pinned = false;
    return { done: true };
  }

  function beginShowProp(action) {
    const propName = action.prop || 'amplifier';
    let pos;
    // Bonfire and amp use layout positions directly for accurate placement
    const L = Renderer.getLayout();
    if (propName === 'bonfire') {
      pos = { x: L.fireX, y: L.fireY };
    } else if (propName === 'amplifier') {
      pos = { x: L.ampX, y: L.ampY };
    } else {
      pos = remapPosition(action.x || 0, action.y || 0);
    }
    activeProps.push({
      name: propName,
      x: pos.x,
      y: pos.y,
      scale: action.scale || 1,
    });
    return { done: true };
  }

  function beginHideProp(action) {
    const idx = activeProps.findIndex(p => p.name === (action.prop || 'amplifier'));
    if (idx >= 0) activeProps.splice(idx, 1);
    return { done: true };
  }

  // Idle/dance animation update — called every frame
  function updateCharacterAnimations(dt) {
    const t = Date.now();
    if (danceActive) danceElapsed += dt;

    const visibleChars = Object.values(characters).filter(c => c.visible);

    for (let i = 0; i < visibleChars.length; i++) {
      const char = visibleChars[i];
      const seed = char.idleSeed;

      if (char.pinned) {
        // Pinned characters stay put — just subtle bob from idle
      } else if (char.dancing) {
        // Coordinated dance: characters orbit around the bonfire
        const dancingChars = visibleChars.filter(c => c.dancing);
        const di = dancingChars.indexOf(char);
        const totalDancers = dancingChars.length;
        const angle = (t / 2500 + (di / totalDancers) * Math.PI * 2) % (Math.PI * 2);
        const L = Renderer.getLayout();
        const centerX = L.danceCenterX;
        const centerY = L.danceCenterY;
        const radiusX = L.danceRadiusX + Math.sin(t / 2000) * 8;
        const radiusY = L.danceRadiusY + Math.sin(t / 2500) * 5;
        // Center sprite on orbit position (not top-left corner)
        const s = char.renderScale || 1;
        char.x = centerX + Math.cos(angle) * radiusX - (SpriteLibrary.W * s) / 2;
        char.y = centerY + Math.sin(angle) * radiusY - (SpriteLibrary.H * s) / 2;
      } else if (char.milling) {
        // Wandering near base position — avoid the fire
        const wx = Math.sin(t / 2500 + seed) * 10 + Math.sin(t / 4000 + seed * 2) * 5;
        const wy = Math.sin(t / 3000 + seed * 1.5) * 4;
        let nx = char.baseX + wx;
        let ny = char.baseY + wy;
        // Hard push away from fire — characters must stay outside fire zone
        const fL = Renderer.getLayout();
        const charCX = nx + SpriteLibrary.W / 2;
        const charCY = ny + SpriteLibrary.H * 0.7; // feet area
        const dxF = charCX - fL.fireX;
        const dyF = charCY - fL.fireY;
        const distF = Math.sqrt(dxF * dxF + dyF * dyF);
        const minDist = 35; // minimum distance from fire center
        if (distF < minDist && distF > 0) {
          // Hard push — force them outside the radius
          nx = fL.fireX + (dxF / distF) * minDist - SpriteLibrary.W / 2;
          ny = fL.fireY + (dyF / distF) * minDist - SpriteLibrary.H * 0.7;
        }
        char.x = nx;
        char.y = ny;
      } else {
        // Subtle idle bob — slight vertical bounce
        // Don't override if a tween is actively moving the character
      }
    }
  }

  let currentActionState = null;

  function processNextAction() {
    const scene = script.scenes[sceneIndex];
    if (!scene) {
      running = false;
      if (onCompleteCallback) { onCompleteCallback(); onCompleteCallback = null; }
      return;
    }

    if (actionIndex >= scene.actions.length) {
      // Move to next scene
      sceneIndex++;
      actionIndex = 0;
      sceneElapsed = 0;
      if (sceneIndex < script.scenes.length) {
        const nextScene = script.scenes[sceneIndex];
        if (nextScene.background) {
          currentBackground = nextScene.background;
        }
      }
      processNextAction();
      return;
    }

    const action = scene.actions[actionIndex];

    // Timecode support: if action has "at" field, wait until scene time reaches it
    if (action.at !== undefined && sceneElapsed < action.at) {
      waitTimer = action.at - sceneElapsed;
      currentActionState = { done: false, type: 'timed', onDone: () => {
        currentActionState = beginAction(action);
        if (currentActionState.done) { actionIndex++; processNextAction(); }
      }};
      return;
    }

    currentActionState = beginAction(action);

    if (currentActionState.done) {
      actionIndex++;
      processNextAction();
    }
  }

  function update(dt) {
    if (!running || !currentActionState) return;

    sceneElapsed += dt;
    AnimationSystem.update(dt);

    // Sprite animation
    animTimer += dt;
    if (animTimer >= ANIM_INTERVAL) {
      animTimer -= ANIM_INTERVAL;
      animFrame = (animFrame + 1) % 2;
    }

    // Emote bob
    if (activeEmote) {
      emoteTimer -= dt;
      if (emoteTimer <= 0) {
        activeEmote = null;
      }
    }

    // UFO animation
    updateUfo(dt);

    // Character animations (idle/mill/dance)
    updateCharacterAnimations(dt);

    // Update overlay timers
    if (titleOverlay) titleOverlay.elapsed += dt;
    if (creditsOverlay) creditsOverlay.elapsed += dt;

    if (currentActionState.type === 'timed') {
      waitTimer -= dt;
      if (waitTimer <= 0 || skipPressed) {
        if (currentActionState.onDone) currentActionState.onDone();
        skipPressed = false;
        actionIndex++;
        processNextAction();
      }
    } else if (currentActionState.type === 'dialogue') {
      const twState = AnimationSystem.getTypewriterState();
      if (autoAdvance) {
        if (twState.done) {
          autoAdvanceTimer += dt;
          if (autoAdvanceTimer >= autoAdvanceDelay) {
            waitingForInput = false;
            autoAdvanceTimer = 0;
            actionIndex++;
            processNextAction();
          }
        }
      } else if (advancePressed) {
        if (!twState.done) {
          AnimationSystem.completeTypewriter();
        } else {
          waitingForInput = false;
          advancePressed = false;
          actionIndex++;
          processNextAction();
        }
        advancePressed = false;
      }
    }
  }

  function render() {
    Renderer.beginFrame();

    // Background
    if (currentBackground) {
      Renderer.drawBackground(currentBackground);
    }

    // Camera (shake)
    const camera = AnimationSystem.getCamera();
    Renderer.applyCamera(camera);

    // Characters + props — all depth-sorted together
    const t = Date.now();

    // Compute perspective scale for all visible characters
    const visibleChars = Object.values(characters).filter(c => c.visible);
    for (const char of visibleChars) {
      if (!char.pinned) {
        const L = Renderer.getLayout();
        const minY = L.perspMinY, maxY = L.perspMaxY;
        const minScale = L.perspMinScale, maxScale = L.perspMaxScale;
        const depthT = Math.max(0, Math.min(1, (char.y - minY) / (maxY - minY)));
        char.renderScale = minScale + depthT * (maxScale - minScale);
      }
    }

    // Build sorted render list: characters + props together
    const renderList = [];
    for (const char of visibleChars) {
      const feet = char.y + SpriteLibrary.H * (char.renderScale || 1);
      renderList.push({ type: 'char', obj: char, feet: feet });
    }
    for (const prop of activeProps) {
      // Props sort by their bottom edge (y + height estimate)
      const propH = prop.name === 'bonfire' ? 20 : 18;
      renderList.push({ type: 'prop', obj: prop, feet: prop.y + propH });
    }
    renderList.sort((a, b) => a.feet - b.feet);

    // Lyra's position for facing direction
    const lyraChar = characters['lyra'];
    const lyraX = lyraChar ? lyraChar.x + SpriteLibrary.W / 2 : 210;

    // Render sorted list
    for (const item of renderList) {
      if (item.type === 'prop') {
        const prop = item.obj;
        if (prop.name === 'bonfire') {
          Renderer.drawBonfire(prop.x, prop.y, t, prop.scale || 1);
        } else {
          Renderer.drawProp(prop.name, Math.round(prop.x), Math.round(prop.y));
        }
        continue;
      }

      const char = item.obj;
      const idleBob = (!char.dancing && !char.milling) ? Math.sin(t / 600 + char.idleSeed * 10) * 1.5 : 0;

      // Face direction based on state
      if (!char.pinned) {
        const charCenterX = char.x + SpriteLibrary.W * (char.renderScale || 1) / 2;

        if (char.dancing) {
          // Dancing: face direction of movement (tangent to orbit)
          // If moving right (cos component positive), face right (not flipped)
          const dancingChars = visibleChars.filter(c => c.dancing);
          const di = dancingChars.indexOf(char);
          const totalDancers = dancingChars.length || 1;
          const angle = (t / 2500 + (di / totalDancers) * Math.PI * 2) % (Math.PI * 2);
          // Tangent direction: -sin(angle) for x velocity
          char.flipped = Math.sin(angle) > 0;
        } else {
          // Milling/idle: look at Lyra, fire, or neighbors
          const attentionCycle = 8000 + char.idleSeed * 3000;
          const attentionPhase = ((t + char.idleSeed * 5000) % attentionCycle) / attentionCycle;
          let lookAtX;
          if (attentionPhase < 0.4) {
            lookAtX = lyraX; // look at Lyra
          } else if (attentionPhase < 0.65) {
            lookAtX = Renderer.getLayout().fireX; // look at fire
          } else if (attentionPhase < 0.85) {
            // Look at a nearby character
            const nearIdx = Math.floor(char.idleSeed * visibleChars.length) % visibleChars.length;
            lookAtX = visibleChars[nearIdx].x + 16;
          } else {
            // Glance around randomly
            lookAtX = charCenterX + Math.sin(t / 800 + char.idleSeed * 7) * 80;
          }
          char.flipped = charCenterX > lookAtX;
        }
      }

      Renderer.drawCharacterWithOffset(char, animFrame, 0, idleBob);

      // Smoke if touching the bonfire (fire center ~145, 148)
      if (char.visible && !char.pinned) {
        const charCenterX = char.x + SpriteLibrary.W / 2;
        const charBottom = char.y + SpriteLibrary.H;
        const distX = Math.abs(charCenterX - Renderer.getLayout().fireX);
        const distY = Math.abs(charBottom - Renderer.getLayout().fireY);
        if (distX < 20 && distY < 20) {
          Renderer.drawSmoke(charCenterX, char.y, t, char.idleSeed);
        }
      }
    }

    // Music notes
    if (notesActive && notesCharId && characters[notesCharId]) {
      const nc = characters[notesCharId];
      if (nc.visible) {
        const scale = nc.renderScale || 1;
        Renderer.drawMusicNotes(
          nc.x + (SpriteLibrary.W * scale) / 2,
          nc.y,
          Date.now()
        );
      }
    }

    // Emote
    if (activeEmote) {
      const bob = Math.sin(Date.now() / 200) * 2;
      Renderer.drawEmoteBubble(activeEmote.character, activeEmote.emote, bob);
    }

    // UFO
    if (ufoState) {
      Renderer.drawUfo(ufoState);
    }

    Renderer.restoreCamera();

    // Dialogue box
    if (waitingForInput) {
      const charId = script.scenes[sceneIndex]?.actions[actionIndex]?.character;
      const charDef = charId ? script.characters[charId] : null;
      const twState = AnimationSystem.getTypewriterState();
      const lineCount = twState.lines ? twState.lines.length : 1;
      Renderer.drawDialogueBox(
        charDef ? charDef.name : '',
        charDef ? charDef.nameColor : '#ffffff',
        lineCount
      );
      Renderer.drawDialogueText(twState, lineCount);
    }

    // Title overlay
    if (titleOverlay) {
      Renderer.drawTitleOverlay(titleOverlay);
    }

    // Credits overlay
    if (creditsOverlay) {
      Renderer.drawCreditsOverlay(creditsOverlay);
    }

    // Fade overlay
    const fadeAlpha = AnimationSystem.getFadeAlpha();
    Renderer.drawFadeOverlay(fadeAlpha);

    // Present to display canvas
    Renderer.present();
  }

  function gameLoop(timestamp) {
    if (!running) return;
    const dt = lastTime ? timestamp - lastTime : 16;
    lastTime = timestamp;

    update(dt);
    render();

    requestAnimationFrame(gameLoop);
  }

  // --- Public API ---

  function play(cutsceneScript, options) {
    script = cutsceneScript;
    sceneIndex = 0;
    actionIndex = 0;
    running = true;
    lastTime = 0;
    animFrame = 0;
    animTimer = 0;
    waitingForInput = false;
    waitTimer = 0;
    activeEmote = null;
    titleOverlay = null;
    creditsOverlay = null;
    sceneElapsed = 0;
    danceActive = false;
    notesActive = false;
    notesCharId = null;
    ufoState = null;
    activeProps.length = 0;
    currentActionState = null;
    autoAdvance = (options && options.autoAdvance) || false;
    autoAdvanceDelay = (options && options.autoAdvanceDelay) || 2000;
    autoAdvanceTimer = 0;
    onCompleteCallback = (options && options.onComplete) || null;

    // Clear characters
    for (const key of Object.keys(characters)) {
      delete characters[key];
    }

    AnimationSystem.clear();

    // Set initial background from first scene
    if (script.scenes[0] && script.scenes[0].background) {
      currentBackground = script.scenes[0].background;
    } else {
      currentBackground = null;
    }

    // Start processing
    processNextAction();
    requestAnimationFrame(gameLoop);
  }

  function stop() {
    running = false;
  }

  function pause() {
    running = false;
  }

  function resume() {
    if (!script || !currentActionState) return;
    running = true;
    lastTime = 0;
    requestAnimationFrame(gameLoop);
  }

  function step() {
    if (!script) return;
    running = false;
    // Advance one action — skip instant actions until we hit a timed/dialogue one
    if (currentActionState) {
      if (currentActionState.onDone) currentActionState.onDone();
      if (currentActionState.type === 'dialogue') waitingForInput = false;
      actionIndex++;
    }
    // Process next actions, stopping at the first non-instant one
    const scene = script.scenes[sceneIndex];
    if (!scene) return;
    while (actionIndex < scene.actions.length || sceneIndex < script.scenes.length - 1) {
      processNextAction();
      if (!currentActionState || !currentActionState.done) break;
    }
    // Render one frame
    AnimationSystem.update(16);
    render();
  }

  function jumpToScene(index) {
    if (!script || index < 0 || index >= script.scenes.length) return;
    // Reset state
    for (const key of Object.keys(characters)) delete characters[key];
    AnimationSystem.clear();
    waitingForInput = false;
    waitTimer = 0;
    activeEmote = null;
    titleOverlay = null;
    creditsOverlay = null;
    sceneElapsed = 0;
    danceActive = false;
    notesActive = false;
    notesCharId = null;
    ufoState = null;
    activeProps.length = 0;
    currentActionState = null;

    // Replay state-building actions from all previous scenes
    // so characters, props, scale, pins, etc are reconstructed
    const stateActions = ['enter', 'showProp', 'setScale', 'pin', 'showNotes',
                          'mill', 'joinDance', 'dance', 'ufoArrive'];
    for (let si = 0; si < index; si++) {
      const prevScene = script.scenes[si];
      if (prevScene.background) currentBackground = prevScene.background;
      for (const action of prevScene.actions) {
        if (stateActions.includes(action.type)) {
          // Execute instantly without animation
          if (action.type === 'enter' || action.type === 'ufoArrive') {
            const char = getOrCreateCharacter(action.character);
            let to;
            // Lyra uses layout position directly
            if (action.character === 'lyra') {
              const lyraL = Renderer.getLayout();
              to = { x: lyraL.lyraX, y: lyraL.lyraY };
            } else {
              const rawTo = action.to || { x: 128, y: 120 };
              to = remapPosition(rawTo.x, rawTo.y);
            }
            const jL = Renderer.getLayout();
            const jdx = to.x + SpriteLibrary.W / 2 - jL.fireX;
            const jdy = to.y + SpriteLibrary.H * 0.7 - jL.fireY;
            const jdist = Math.sqrt(jdx * jdx + jdy * jdy);
            if (jdist < 40 && jdist > 0) {
              to.x = jL.fireX + (jdx / jdist) * 40 - SpriteLibrary.W / 2;
              to.y = jL.fireY + (jdy / jdist) * 40 - SpriteLibrary.H * 0.7;
            }
            char.x = to.x; char.y = to.y;
            char.baseX = to.x; char.baseY = to.y;
            char.visible = true;
          } else if (action.type === 'showProp') {
            const pn = action.prop || 'amplifier';
            const LL = Renderer.getLayout();
            let pp;
            if (pn === 'bonfire') pp = { x: LL.fireX, y: LL.fireY };
            else if (pn === 'amplifier') pp = { x: LL.ampX, y: LL.ampY };
            else pp = remapPosition(action.x || 0, action.y || 0);
            activeProps.push({ name: pn, x: pp.x, y: pp.y, scale: action.scale || 1 });
          } else if (action.type === 'setScale') {
            const char = getOrCreateCharacter(action.character);
            if (action.character === 'lyra') {
              const sL = Renderer.getLayout();
              char.renderScale = sL.lyraScale || action.scale || 1;
            } else {
              char.renderScale = action.scale || 1;
            }
          } else if (action.type === 'pin') {
            const char = getOrCreateCharacter(action.character);
            char.pinned = true;
          } else if (action.type === 'showNotes') {
            notesActive = true; notesCharId = action.character || null;
          } else if (action.type === 'mill') {
            for (const c of Object.values(characters)) { if (c.visible && !c.pinned) c.milling = true; }
          } else if (action.type === 'joinDance') {
            danceActive = true;
            const char = getOrCreateCharacter(action.character);
            if (!char.pinned) { char.dancing = true; char.milling = false; }
          } else if (action.type === 'dance') {
            danceActive = true;
            for (const c of Object.values(characters)) { if (c.visible && !c.pinned) { c.dancing = true; c.milling = false; } }
          }
        }
      }
    }

    sceneIndex = index;
    actionIndex = 0;
    const scene = script.scenes[sceneIndex];
    if (scene && scene.background) currentBackground = scene.background;
    running = true;
    lastTime = 0;
    processNextAction();
    requestAnimationFrame(gameLoop);
  }

  function nextScene() {
    if (!script) return;
    jumpToScene(sceneIndex + 1);
  }

  function prevScene() {
    if (!script) return;
    jumpToScene(Math.max(0, sceneIndex - 1));
  }

  function getSceneCount() {
    return script ? script.scenes.length : 0;
  }

  function getState() {
    return {
      sceneIndex,
      actionIndex,
      running,
      waitingForInput,
      currentBackground,
      characterCount: Object.keys(characters).length,
      sceneCount: script ? script.scenes.length : 0,
    };
  }

  function handleInput(type) {
    if (type === 'advance') {
      advancePressed = true;
    } else if (type === 'skip') {
      skipPressed = true;
    }
  }

  function isRunning() { return running; }
  function setAutoAdvance(on, delay) {
    autoAdvance = !!on;
    if (delay !== undefined) autoAdvanceDelay = delay;
  }
  function getAutoAdvance() { return autoAdvance; }
  return { play, stop, pause, resume, step, getState, handleInput, isRunning, nextScene, prevScene, jumpToScene, getSceneCount, setAutoAdvance, getAutoAdvance };
})();
