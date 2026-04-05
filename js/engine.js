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
        visible: false,
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
    const to = action.to || { x: 128, y: 120 };
    const duration = action.duration || 800;

    char.x = from.x !== null ? from.x : to.x;
    char.y = from.y !== null ? from.y : to.y;
    char.visible = true;

    const tweenX = AnimationSystem.addTween(char, 'x', char.x, to.x, duration, 'easeOut');
    const tweenY = AnimationSystem.addTween(char, 'y', char.y, to.y, duration, 'easeOut');

    waitTimer = duration;
    return { done: false, type: 'timed' };
  }

  function beginExit(action) {
    const char = getOrCreateCharacter(action.character);
    const toDir = getOffscreenPos(action.to || 'right');
    const duration = action.duration || 800;

    const targetX = toDir.x !== null ? toDir.x : char.x;
    const targetY = toDir.y !== null ? toDir.y : char.y;

    AnimationSystem.addTween(char, 'x', char.x, targetX, duration, 'easeIn');
    AnimationSystem.addTween(char, 'y', char.y, targetY, duration, 'easeIn');

    waitTimer = duration;
    return { done: false, type: 'timed', onDone: () => { char.visible = false; } };
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
    const to = action.to || { x: char.x, y: char.y };
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
    const totalHeight = lines.length * 14 + 224; // enough to scroll everything off
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

    // Characters
    for (const char of Object.values(characters)) {
      Renderer.drawCharacter(char, animFrame);
    }

    // Emote
    if (activeEmote) {
      const bob = Math.sin(Date.now() / 200) * 2;
      Renderer.drawEmoteBubble(activeEmote.character, activeEmote.emote, bob);
    }

    Renderer.restoreCamera();

    // Dialogue box
    if (waitingForInput) {
      const charId = script.scenes[sceneIndex]?.actions[actionIndex]?.character;
      const charDef = charId ? script.characters[charId] : null;
      Renderer.drawDialogueBox(
        charDef ? charDef.name : '',
        charDef ? charDef.nameColor : '#ffffff'
      );
      Renderer.drawDialogueText(AnimationSystem.getTypewriterState());
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

  function getState() {
    return {
      sceneIndex,
      actionIndex,
      running,
      waitingForInput,
      currentBackground,
      characterCount: Object.keys(characters).length,
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
  return { play, stop, pause, resume, step, getState, handleInput, isRunning };
})();
