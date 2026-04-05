/**
 * Renderer — Canvas rendering for backgrounds, sprites, dialogue, and effects.
 */
const Renderer = (() => {
  const INTERNAL_W = 256;
  const INTERNAL_H = 224;
  const SCALE = 3; // 256*3 = 768, 224*3 = 672

  let displayCanvas, displayCtx;
  let offscreen, ctx;

  // Dialogue box dimensions (in internal resolution)
  const DIALOG_MARGIN = 8;
  const DIALOG_HEIGHT = 56;
  const DIALOG_Y = INTERNAL_H - DIALOG_HEIGHT - DIALOG_MARGIN;
  const TEXT_PADDING = 8;
  const TEXT_SCALE = 1;

  function init(canvasElement) {
    displayCanvas = canvasElement;
    displayCanvas.width = INTERNAL_W * SCALE;
    displayCanvas.height = INTERNAL_H * SCALE;
    displayCtx = displayCanvas.getContext('2d');
    displayCtx.imageSmoothingEnabled = false;

    offscreen = document.createElement('canvas');
    offscreen.width = INTERNAL_W;
    offscreen.height = INTERNAL_H;
    ctx = offscreen.getContext('2d');
  }

  // --- Background drawing ---

  const backgrounds = {
    castle_hall(ctx) {
      // Gray stone walls
      ctx.fillStyle = '#444455';
      ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);

      // Floor
      ctx.fillStyle = '#555566';
      ctx.fillRect(0, 140, INTERNAL_W, INTERNAL_H - 140);

      // Stone tile pattern
      ctx.fillStyle = '#3a3a4a';
      for (let y = 0; y < INTERNAL_H; y += 16) {
        for (let x = 0; x < INTERNAL_W; x += 24) {
          const offset = (Math.floor(y / 16) % 2) * 12;
          ctx.fillRect(x + offset, y, 23, 15);
          ctx.fillStyle = '#505060';
          ctx.fillRect(x + offset + 1, y + 1, 21, 13);
          ctx.fillStyle = '#3a3a4a';
        }
      }

      // Torches
      for (let tx = 40; tx < INTERNAL_W; tx += 80) {
        ctx.fillStyle = '#665533';
        ctx.fillRect(tx, 40, 3, 20);
        ctx.fillStyle = '#ff8833';
        ctx.fillRect(tx - 2, 32, 7, 8);
        ctx.fillStyle = '#ffcc44';
        ctx.fillRect(tx - 1, 34, 5, 4);
      }
    },

    forest(ctx) {
      // Sky gradient (manual)
      for (let y = 0; y < 100; y++) {
        const t = y / 100;
        const r = Math.floor(20 + t * 30);
        const g = Math.floor(40 + t * 60);
        const b = Math.floor(80 + t * 40);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, y, INTERNAL_W, 1);
      }

      // Ground
      ctx.fillStyle = '#2a5a2a';
      ctx.fillRect(0, 100, INTERNAL_W, INTERNAL_H - 100);
      ctx.fillStyle = '#1a4a1a';
      ctx.fillRect(0, 140, INTERNAL_W, INTERNAL_H - 140);

      // Trees (simple triangles)
      const treePositions = [20, 60, 110, 170, 210];
      for (const tx of treePositions) {
        const h = 40 + Math.floor(Math.sin(tx) * 15);
        ctx.fillStyle = '#553322';
        ctx.fillRect(tx + 6, 100 - h + 30, 6, h - 20);
        ctx.fillStyle = '#226633';
        for (let i = 0; i < 3; i++) {
          const w = 24 - i * 4;
          const ty = 100 - h + i * 14;
          ctx.fillRect(tx + 9 - w / 2, ty, w, 18);
        }
      }
    },

    night_sky(ctx) {
      // Dark sky
      ctx.fillStyle = '#0a0a22';
      ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);

      // Stars (seeded pseudo-random for consistency)
      ctx.fillStyle = '#ffffff';
      let seed = 12345;
      for (let i = 0; i < 60; i++) {
        seed = (seed * 16807 + 0) % 2147483647;
        const sx = seed % INTERNAL_W;
        seed = (seed * 16807 + 0) % 2147483647;
        const sy = seed % (INTERNAL_H - 60);
        seed = (seed * 16807 + 0) % 2147483647;
        const bright = 0.3 + (seed % 70) / 100;
        ctx.globalAlpha = bright;
        ctx.fillRect(sx, sy, 1, 1);
      }
      ctx.globalAlpha = 1.0;

      // Moon
      ctx.fillStyle = '#ddeeff';
      fillCircle(ctx, 200, 30, 12);
      ctx.fillStyle = '#0a0a22';
      fillCircle(ctx, 204, 27, 10);

      // Ground
      ctx.fillStyle = '#111122';
      ctx.fillRect(0, 170, INTERNAL_W, INTERNAL_H - 170);
    },

    dark_tower(ctx) {
      // Dark stormy sky
      ctx.fillStyle = '#1a1028';
      ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);

      // Purple clouds
      ctx.fillStyle = '#2a1a38';
      for (let i = 0; i < 5; i++) {
        const cx = 30 + i * 50;
        fillCircle(ctx, cx, 30 + (i % 3) * 10, 20 + (i % 2) * 10);
      }

      // Tower silhouette
      ctx.fillStyle = '#0a0a10';
      ctx.fillRect(100, 40, 56, 180);
      ctx.fillRect(90, 160, 76, 64);
      // Battlements
      for (let bx = 90; bx < 166; bx += 12) {
        ctx.fillRect(bx, 152, 8, 8);
      }
      // Tower top
      ctx.fillRect(108, 20, 40, 20);
      ctx.fillRect(116, 10, 24, 10);
      // Window (glowing)
      ctx.fillStyle = '#884488';
      ctx.fillRect(122, 60, 12, 16);
      ctx.fillStyle = '#aa66aa';
      ctx.fillRect(124, 62, 8, 12);

      // Ground
      ctx.fillStyle = '#0a0812';
      ctx.fillRect(0, 180, INTERNAL_W, INTERNAL_H - 180);
    },

    village(ctx) {
      // Sky
      ctx.fillStyle = '#6688bb';
      ctx.fillRect(0, 0, INTERNAL_W, 120);

      // Clouds
      ctx.fillStyle = '#99aaccdd';
      fillCircle(ctx, 40, 30, 15);
      fillCircle(ctx, 55, 25, 18);
      fillCircle(ctx, 70, 30, 14);
      fillCircle(ctx, 180, 40, 12);
      fillCircle(ctx, 195, 35, 16);

      // Ground
      ctx.fillStyle = '#7a9944';
      ctx.fillRect(0, 120, INTERNAL_W, INTERNAL_H - 120);
      ctx.fillStyle = '#8a6633';
      ctx.fillRect(0, 160, INTERNAL_W, 10); // path

      // Houses
      const housePositions = [30, 130, 200];
      for (const hx of housePositions) {
        // Walls
        ctx.fillStyle = '#bb8844';
        ctx.fillRect(hx, 95, 40, 30);
        // Roof
        ctx.fillStyle = '#884422';
        ctx.fillRect(hx - 4, 85, 48, 12);
        // Door
        ctx.fillStyle = '#553311';
        ctx.fillRect(hx + 15, 108, 10, 17);
        // Window
        ctx.fillStyle = '#aaddff';
        ctx.fillRect(hx + 5, 100, 7, 7);
      }
    },
  };

  function fillCircle(ctx, cx, cy, r) {
    for (let y = -r; y <= r; y++) {
      for (let x = -r; x <= r; x++) {
        if (x * x + y * y <= r * r) {
          ctx.fillRect(cx + x, cy + y, 1, 1);
        }
      }
    }
  }

  function drawBackground(name) {
    if (backgrounds[name]) {
      backgrounds[name](ctx);
    } else {
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);
    }
    // Animated overlays
    if (bgAnimations[name]) {
      bgAnimations[name](ctx, Date.now());
    }
  }

  // --- Background animations ---

  const bgAnimations = {
    castle_hall(ctx, t) {
      // Flickering torches — vary brightness
      const torchPositions = [40, 120, 200];
      for (const tx of torchPositions) {
        const flicker = Math.sin(t / 80 + tx) * 0.3 + Math.sin(t / 130 + tx * 2) * 0.2;
        const bright = 0.6 + flicker * 0.4;
        ctx.globalAlpha = bright;
        ctx.fillStyle = '#ffcc44';
        ctx.fillRect(tx - 1, 34, 5, 4);
        ctx.fillStyle = '#ff8833';
        ctx.fillRect(tx - 2, 32, 7, 6);
        // Glow on wall
        ctx.globalAlpha = bright * 0.15;
        ctx.fillStyle = '#ff8833';
        fillCircle(ctx, tx + 1, 38, 12);
        ctx.globalAlpha = 1;
      }
      // Dust motes floating
      ctx.fillStyle = '#aaaa88';
      for (let i = 0; i < 8; i++) {
        const speed = 0.01 + (i % 3) * 0.005;
        const dx = ((t * speed + i * 37) % (INTERNAL_W + 20)) - 10;
        const dy = 30 + Math.sin(t / 800 + i * 1.7) * 40 + (i * 17) % 60;
        ctx.globalAlpha = 0.3 + Math.sin(t / 600 + i) * 0.15;
        ctx.fillRect(Math.floor(dx), Math.floor(dy), 1, 1);
      }
      ctx.globalAlpha = 1;
    },

    forest(ctx, t) {
      // Falling leaves
      ctx.fillStyle = '#88aa33';
      for (let i = 0; i < 6; i++) {
        const speed = 0.015 + (i % 3) * 0.008;
        const leafY = ((t * speed + i * 50) % (130)) + 10;
        const leafX = 20 + (i * 43) % 220 + Math.sin(t / 500 + i * 2) * 8;
        const c = (i % 2 === 0) ? '#88aa33' : '#cc8833';
        ctx.fillStyle = c;
        ctx.globalAlpha = 0.7;
        ctx.fillRect(Math.floor(leafX), Math.floor(leafY), 2, 1);
        ctx.fillRect(Math.floor(leafX) + 1, Math.floor(leafY) + 1, 1, 1);
      }
      // Bird/crow flying across
      const birdCycle = 12000; // ms for full crossing
      const birdX = ((t % birdCycle) / birdCycle) * (INTERNAL_W + 40) - 20;
      const birdY = 25 + Math.sin(t / 300) * 3;
      const wingUp = Math.sin(t / 120) > 0;
      ctx.fillStyle = '#222222';
      ctx.globalAlpha = 0.9;
      // Body
      ctx.fillRect(Math.floor(birdX), Math.floor(birdY), 3, 1);
      // Wings
      if (wingUp) {
        ctx.fillRect(Math.floor(birdX) - 2, Math.floor(birdY) - 1, 2, 1);
        ctx.fillRect(Math.floor(birdX) + 3, Math.floor(birdY) - 1, 2, 1);
      } else {
        ctx.fillRect(Math.floor(birdX) - 2, Math.floor(birdY) + 1, 2, 1);
        ctx.fillRect(Math.floor(birdX) + 3, Math.floor(birdY) + 1, 2, 1);
      }
      ctx.globalAlpha = 1;
    },

    night_sky(ctx, t) {
      // Twinkling stars
      let seed = 12345;
      for (let i = 0; i < 60; i++) {
        seed = (seed * 16807) % 2147483647;
        const sx = seed % INTERNAL_W;
        seed = (seed * 16807) % 2147483647;
        const sy = seed % (INTERNAL_H - 60);
        const twinkle = 0.3 + Math.sin(t / 400 + i * 1.3) * 0.3 + Math.sin(t / 700 + i * 0.7) * 0.2;
        ctx.globalAlpha = Math.max(0.05, twinkle);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(sx, sy, 1, 1);
      }
      // Cloud drifting across moon area
      const cloudX = 150 + Math.sin(t / 8000) * 50;
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = '#334455';
      fillCircle(ctx, Math.floor(cloudX), 28, 8);
      fillCircle(ctx, Math.floor(cloudX) + 10, 25, 10);
      fillCircle(ctx, Math.floor(cloudX) + 20, 28, 7);
      // Second cloud, slower
      const cloud2X = 60 + Math.sin(t / 12000 + 2) * 70;
      ctx.globalAlpha = 0.15;
      fillCircle(ctx, Math.floor(cloud2X), 45, 12);
      fillCircle(ctx, Math.floor(cloud2X) + 14, 42, 9);
      fillCircle(ctx, Math.floor(cloud2X) + 25, 46, 8);
      // Shooting star (occasional)
      const shootCycle = 7000;
      const shootPhase = (t % shootCycle) / shootCycle;
      if (shootPhase < 0.08) {
        const sp = shootPhase / 0.08;
        const sx = 30 + sp * 100;
        const sy = 10 + sp * 40;
        ctx.globalAlpha = 1 - sp;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(Math.floor(sx), Math.floor(sy), 2, 1);
        ctx.fillRect(Math.floor(sx) - 2, Math.floor(sy) - 1, 1, 1);
      }
      ctx.globalAlpha = 1;
    },

    dark_tower(ctx, t) {
      // Lightning flash (rare)
      const flashCycle = 9000;
      const flashPhase = (t % flashCycle) / flashCycle;
      if (flashPhase > 0.92 && flashPhase < 0.94) {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#8866cc';
        ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);
      }
      // Swirling embers around tower
      ctx.fillStyle = '#884488';
      for (let i = 0; i < 10; i++) {
        const angle = (t / 2000 + i * 0.628) % (Math.PI * 2);
        const radius = 30 + Math.sin(t / 1500 + i) * 10;
        const ex = 128 + Math.cos(angle) * radius;
        const ey = 80 + Math.sin(angle) * radius * 0.5;
        ctx.globalAlpha = 0.4 + Math.sin(t / 300 + i * 2) * 0.3;
        ctx.fillRect(Math.floor(ex), Math.floor(ey), 1, 1);
      }
      // Window flicker
      const wFlicker = 0.7 + Math.sin(t / 200) * 0.2 + Math.sin(t / 370) * 0.1;
      ctx.globalAlpha = wFlicker;
      ctx.fillStyle = '#aa66aa';
      ctx.fillRect(124, 62, 8, 12);
      ctx.globalAlpha = 1;
    },

    village(ctx, t) {
      // Chimney smoke from houses
      const smokePositions = [50, 150, 220];
      ctx.fillStyle = '#999999';
      for (const sx of smokePositions) {
        for (let i = 0; i < 4; i++) {
          const age = ((t / 30 + i * 15 + sx) % 60);
          const py = 78 - age;
          const px = sx + Math.sin(t / 600 + i + sx * 0.1) * (3 + age * 0.1);
          ctx.globalAlpha = Math.max(0, 0.3 - age * 0.005);
          const size = 1 + Math.floor(age / 20);
          ctx.fillRect(Math.floor(px), Math.floor(py), size, size);
        }
      }
      // Bird sitting on roof, occasionally flaps
      const flapPhase = (t % 5000) / 5000;
      const bx = 68;
      const by = 83;
      ctx.fillStyle = '#333333';
      ctx.globalAlpha = 0.9;
      ctx.fillRect(bx, by, 3, 2);
      if (flapPhase > 0.9) {
        ctx.fillRect(bx - 2, by - 1, 2, 1);
        ctx.fillRect(bx + 3, by - 1, 2, 1);
      }
      // Clouds drifting
      const cX = ((t * 0.008) % (INTERNAL_W + 60)) - 30;
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = '#aabbcc';
      fillCircle(ctx, Math.floor(cX), 35, 10);
      fillCircle(ctx, Math.floor(cX) + 12, 32, 13);
      fillCircle(ctx, Math.floor(cX) + 25, 36, 9);
      ctx.globalAlpha = 1;
    },
  };

  // --- Prop rendering ---

  function drawProp(propName, x, y) {
    SpriteLibrary.drawProp(ctx, propName, x, y);
  }

  // --- Character rendering ---

  function drawCharacter(char, animFrame) {
    if (!char.visible) return;
    SpriteLibrary.drawSprite(ctx, char.sprite, Math.round(char.x), Math.round(char.y), animFrame);
  }

  function drawCharacterWithOffset(char, animFrame, ox, oy) {
    if (!char.visible) return;
    const scale = char.renderScale || 1;
    if (scale === 1) {
      SpriteLibrary.drawSprite(ctx, char.sprite, Math.round(char.x + ox), Math.round(char.y + oy), animFrame);
    } else {
      // Draw scaled: render to temp canvas then scale up
      const sw = SpriteLibrary.W;
      const sh = SpriteLibrary.H;
      const tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = sw;
      tmpCanvas.height = sh;
      const tmpCtx = tmpCanvas.getContext('2d');
      SpriteLibrary.drawSprite(tmpCtx, char.sprite, 0, 0, animFrame);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tmpCanvas,
        Math.round(char.x + ox), Math.round(char.y + oy),
        Math.round(sw * scale), Math.round(sh * scale));
    }
  }

  // Draw floating music notes around a position
  function drawMusicNotes(x, y, time) {
    ctx.fillStyle = '#ddcc44';
    for (let i = 0; i < 5; i++) {
      const angle = (time / 1200 + i * 1.256) % (Math.PI * 2);
      const r = 20 + Math.sin(time / 800 + i) * 5;
      const nx = x + Math.cos(angle) * r;
      const ny = y - 10 + Math.sin(angle) * r * 0.4 - Math.sin(time / 400 + i * 2) * 3;
      ctx.globalAlpha = 0.6 + Math.sin(time / 300 + i * 1.5) * 0.3;
      // Note head
      ctx.fillRect(Math.floor(nx), Math.floor(ny), 2, 2);
      // Note stem
      ctx.fillRect(Math.floor(nx) + 2, Math.floor(ny) - 3, 1, 4);
      // Note flag
      ctx.fillRect(Math.floor(nx) + 2, Math.floor(ny) - 3, 2, 1);
    }
    ctx.globalAlpha = 1;
  }

  // --- Emote rendering ---

  function drawEmoteBubble(char, emoteName, bobOffset) {
    const ex = Math.round(char.x) + SpriteLibrary.W / 2 - 6;
    const ey = Math.round(char.y) - 16 + bobOffset;
    SpriteLibrary.drawEmote(ctx, emoteName, ex, ey);
  }

  // --- Dialogue box ---

  function drawDialogueBox(characterName, nameColor) {
    const x = DIALOG_MARGIN;
    const y = DIALOG_Y;
    const w = INTERNAL_W - DIALOG_MARGIN * 2;
    const h = DIALOG_HEIGHT;

    // Box background
    ctx.fillStyle = 'rgba(0, 0, 20, 0.85)';
    ctx.fillRect(x, y, w, h);

    // Border
    ctx.strokeStyle = '#6666aa';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

    // Inner border
    ctx.strokeStyle = '#333366';
    ctx.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);

    // Character name
    if (characterName) {
      PixelFont.drawText(ctx, characterName, x + TEXT_PADDING, y + TEXT_PADDING, nameColor || '#ffffff', TEXT_SCALE);
    }
  }

  function drawDialogueText(twState, nameColor) {
    const x = DIALOG_MARGIN + TEXT_PADDING;
    const startY = DIALOG_Y + TEXT_PADDING + (PixelFont.CHAR_H + 3) * TEXT_SCALE; // below name
    const lineHeight = (PixelFont.CHAR_H + 2) * TEXT_SCALE;

    let charsRemaining = twState.revealedCount;
    for (let i = 0; i < twState.lines.length; i++) {
      const line = twState.lines[i];
      const showChars = Math.min(charsRemaining, line.length);
      if (showChars > 0) {
        PixelFont.drawText(ctx, line.substring(0, showChars), x, startY + i * lineHeight, '#ffffff', TEXT_SCALE);
      }
      charsRemaining -= line.length;
      if (charsRemaining <= 0) break;
    }

    // Blinking advance indicator when done
    if (twState.done) {
      const blinkOn = Math.floor(Date.now() / 400) % 2 === 0;
      if (blinkOn) {
        const indicatorX = INTERNAL_W - DIALOG_MARGIN - TEXT_PADDING - 6;
        const indicatorY = DIALOG_Y + DIALOG_HEIGHT - TEXT_PADDING - 4;
        ctx.fillStyle = '#8888cc';
        // Small down arrow
        ctx.fillRect(indicatorX + 1, indicatorY, 3, 1);
        ctx.fillRect(indicatorX + 2, indicatorY + 1, 1, 1);
      }
    }
  }

  // --- Transition overlay ---

  function drawFadeOverlay(alpha) {
    if (alpha <= 0) return;
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(alpha, 1)})`;
    ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);
  }

  // --- Title overlay ---

  function drawTitleOverlay(state) {
    const { text, subtitle, color, subtitleColor, duration, fadeIn, fadeOut, elapsed } = state;

    // Calculate alpha for fade in/out
    let alpha = 1;
    if (elapsed < fadeIn) {
      alpha = elapsed / fadeIn;
    } else if (elapsed > duration - fadeOut) {
      alpha = Math.max(0, (duration - elapsed) / fadeOut);
    }

    ctx.globalAlpha = alpha;

    // Title text — large, centered
    const titleScale = 2;
    const titleSize = PixelFont.measureText(text, titleScale);
    const tx = Math.floor((INTERNAL_W - titleSize.width) / 2);
    const ty = Math.floor(INTERNAL_H / 2 - titleSize.height - 8);
    PixelFont.drawText(ctx, text, tx, ty, color, titleScale);

    // Subtitle — smaller, below
    if (subtitle) {
      const subScale = 1;
      const subSize = PixelFont.measureText(subtitle, subScale);
      const sx = Math.floor((INTERNAL_W - subSize.width) / 2);
      const sy = ty + titleSize.height + 10;
      PixelFont.drawText(ctx, subtitle, sx, sy, subtitleColor, subScale);
    }

    // Decorative line under title
    const lineW = Math.max(titleSize.width, 80);
    const lineX = Math.floor((INTERNAL_W - lineW) / 2);
    const lineY = ty + titleSize.height + 4;
    ctx.fillStyle = subtitleColor;
    ctx.fillRect(lineX, lineY, lineW, 1);

    ctx.globalAlpha = 1;
  }

  // --- Credits overlay ---

  function drawCreditsOverlay(state) {
    const { lines, color, highlightColor, speed, elapsed } = state;
    const scrollOffset = (elapsed / 1000) * speed;
    const lineHeight = 14;
    const startY = INTERNAL_H - scrollOffset;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const y = Math.floor(startY + i * lineHeight);

      // Skip lines off screen
      if (y < -lineHeight || y > INTERNAL_H) continue;

      // Lines starting with # are headers (highlighted, larger)
      if (line.startsWith('#')) {
        const headerText = line.substring(1).trim();
        const scale = 1;
        const size = PixelFont.measureText(headerText, scale);
        const x = Math.floor((INTERNAL_W - size.width) / 2);
        PixelFont.drawText(ctx, headerText, x, y, highlightColor, scale);
      } else if (line.trim() === '') {
        // Empty line — just spacing
      } else {
        // Normal credit line — centered
        const scale = 1;
        const size = PixelFont.measureText(line, scale);
        const x = Math.floor((INTERNAL_W - size.width) / 2);
        PixelFont.drawText(ctx, line, x, y, color, scale);
      }
    }
  }

  // --- Frame pipeline ---

  function beginFrame() {
    ctx.clearRect(0, 0, INTERNAL_W, INTERNAL_H);
  }

  function applyCamera(camera) {
    ctx.save();
    ctx.translate(Math.round(camera.offsetX), Math.round(camera.offsetY));
  }

  function restoreCamera() {
    ctx.restore();
  }

  function present() {
    displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
    displayCtx.drawImage(offscreen, 0, 0, displayCanvas.width, displayCanvas.height);
  }

  function getTextMaxWidth() {
    return INTERNAL_W - DIALOG_MARGIN * 2 - TEXT_PADDING * 2;
  }

  function getTextScale() {
    return TEXT_SCALE;
  }

  function getInternalSize() {
    return { width: INTERNAL_W, height: INTERNAL_H };
  }

  function getBackgroundNames() {
    return Object.keys(backgrounds);
  }

  function renderBackgroundToCanvas(name, targetCanvas) {
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = INTERNAL_W;
    tmpCanvas.height = INTERNAL_H;
    const tmpCtx = tmpCanvas.getContext('2d');
    if (backgrounds[name]) {
      backgrounds[name](tmpCtx);
    }
    const tCtx = targetCanvas.getContext('2d');
    tCtx.imageSmoothingEnabled = false;
    tCtx.drawImage(tmpCanvas, 0, 0, targetCanvas.width, targetCanvas.height);
  }

  return {
    init, beginFrame, applyCamera, restoreCamera, present,
    drawBackground, drawProp, drawCharacter, drawCharacterWithOffset, drawEmoteBubble, drawMusicNotes,
    drawDialogueBox, drawDialogueText, drawFadeOverlay,
    drawTitleOverlay, drawCreditsOverlay,
    getTextMaxWidth, getTextScale, getInternalSize,
    getBackgroundNames, renderBackgroundToCanvas,
  };
})();
