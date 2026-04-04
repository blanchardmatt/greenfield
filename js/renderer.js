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
      // Default: solid dark color
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);
    }
  }

  // --- Character rendering ---

  function drawCharacter(char, animFrame) {
    if (!char.visible) return;
    SpriteLibrary.drawSprite(ctx, char.sprite, Math.round(char.x), Math.round(char.y), animFrame);
  }

  // --- Emote rendering ---

  function drawEmoteBubble(char, emoteName, bobOffset) {
    const ex = Math.round(char.x) + SpriteLibrary.W / 2 - 4;
    const ey = Math.round(char.y) - 12 + bobOffset;
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

  return {
    init, beginFrame, applyCamera, restoreCamera, present,
    drawBackground, drawCharacter, drawEmoteBubble,
    drawDialogueBox, drawDialogueText, drawFadeOverlay,
    getTextMaxWidth, getTextScale, getInternalSize,
  };
})();
