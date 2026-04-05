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
  const DIALOG_MARGIN = 4;
  const DIALOG_HEIGHT = 44;
  const DIALOG_Y = INTERNAL_H - DIALOG_HEIGHT - DIALOG_MARGIN;
  const TEXT_PADDING = 4;
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

    // --- The Biltroy helper ---
    // Shared structure drawn by all time-of-day variants
    _biltroy_structure(ctx, palette) {
      const p = palette;

      // Sky (filled by caller before this)

      // Green field
      ctx.fillStyle = p.grass;
      ctx.fillRect(0, 120, INTERNAL_W, INTERNAL_H - 120);
      ctx.fillStyle = p.grassDark;
      ctx.fillRect(0, 150, INTERNAL_W, 8);
      ctx.fillRect(0, 175, INTERNAL_W, 6);

      // Left oak tree
      ctx.fillStyle = p.trunk;
      ctx.fillRect(28, 70, 8, 55);
      ctx.fillStyle = p.leafDark;
      fillCircle(ctx, 32, 55, 22);
      ctx.fillStyle = p.leaf;
      fillCircle(ctx, 25, 50, 14);
      fillCircle(ctx, 40, 48, 16);
      fillCircle(ctx, 30, 42, 12);

      // Right oak tree
      ctx.fillStyle = p.trunk;
      ctx.fillRect(215, 80, 6, 42);
      ctx.fillStyle = p.leafDark;
      fillCircle(ctx, 218, 68, 16);
      ctx.fillStyle = p.leaf;
      fillCircle(ctx, 212, 64, 11);
      fillCircle(ctx, 225, 62, 13);

      // Trailer body
      ctx.fillStyle = p.siding;
      ctx.fillRect(70, 88, 120, 40);
      ctx.fillStyle = p.sidingDark;
      ctx.fillRect(70, 108, 120, 20);
      // Roof
      ctx.fillStyle = p.roof;
      ctx.fillRect(68, 84, 124, 6);
      ctx.fillStyle = p.roofDark;
      ctx.fillRect(68, 83, 124, 2);
      // Outline
      ctx.fillStyle = '#444444';
      ctx.fillRect(70, 88, 120, 1);
      ctx.fillRect(70, 127, 120, 1);
      ctx.fillRect(70, 88, 1, 40);
      ctx.fillRect(189, 88, 1, 40);

      // Windows
      ctx.fillStyle = p.windowColor;
      ctx.fillRect(80, 95, 14, 10);
      ctx.fillRect(100, 95, 14, 10);
      ctx.fillRect(140, 95, 14, 10);
      ctx.fillRect(160, 95, 14, 10);
      ctx.fillStyle = '#eeeeee';
      ctx.fillRect(86, 95, 2, 10);
      ctx.fillRect(106, 95, 2, 10);
      ctx.fillRect(146, 95, 2, 10);
      ctx.fillRect(166, 95, 2, 10);

      // Door
      ctx.fillStyle = '#886644';
      ctx.fillRect(120, 96, 12, 32);
      ctx.fillStyle = '#775533';
      ctx.fillRect(120, 96, 12, 1);
      ctx.fillStyle = '#ccaa44';
      ctx.fillRect(129, 112, 2, 2);

      // Skirt & supports
      ctx.fillStyle = '#999988';
      ctx.fillRect(70, 128, 120, 4);
      ctx.fillStyle = '#888888';
      ctx.fillRect(78, 128, 6, 6);
      ctx.fillRect(128, 128, 6, 6);
      ctx.fillRect(178, 128, 6, 6);

      // Deck
      ctx.fillStyle = p.deck;
      ctx.fillRect(190, 108, 44, 26);
      ctx.fillStyle = p.deckDark;
      ctx.fillRect(190, 114, 44, 1);
      ctx.fillRect(190, 120, 44, 1);
      ctx.fillRect(190, 126, 44, 1);
      ctx.fillStyle = p.deckDark;
      ctx.fillRect(190, 102, 3, 8);
      ctx.fillRect(210, 102, 3, 8);
      ctx.fillRect(231, 102, 3, 8);
      ctx.fillRect(190, 104, 44, 2);
      ctx.fillStyle = p.deckDark;
      ctx.fillRect(220, 132, 14, 4);
      ctx.fillRect(222, 136, 10, 4);

      // Bonfire pit
      ctx.fillStyle = '#777766';
      fillCircle(ctx, 145, 148, 8);
      ctx.fillStyle = p.grass;
      fillCircle(ctx, 145, 148, 5);
      ctx.fillStyle = '#664422';
      ctx.fillRect(140, 146, 12, 3);
      ctx.fillRect(143, 144, 3, 8);
      ctx.fillStyle = '#cc5522';
      ctx.fillRect(142, 140, 8, 6);
      ctx.fillStyle = '#ff8833';
      ctx.fillRect(143, 138, 6, 5);
      ctx.fillStyle = '#ffcc44';
      ctx.fillRect(144, 136, 4, 4);

      // Grass tufts
      ctx.fillStyle = p.leaf;
      ctx.fillRect(55, 132, 3, 2);
      ctx.fillRect(245, 128, 2, 3);
      ctx.fillRect(10, 140, 3, 2);
    },

    biltroy(ctx) {
      ctx.fillStyle = '#6699cc';
      ctx.fillRect(0, 0, INTERNAL_W, 120);
      ctx.fillStyle = '#aaccee';
      fillCircle(ctx, 50, 25, 12);
      fillCircle(ctx, 65, 22, 15);
      fillCircle(ctx, 80, 26, 11);
      backgrounds._biltroy_structure(ctx, {
        grass: '#5a9a3a', grassDark: '#4a8a2a', trunk: '#554422',
        leaf: '#448833', leafDark: '#336622', siding: '#ccbbaa',
        sidingDark: '#bbaa99', roof: '#777777', roofDark: '#666666',
        windowColor: '#88bbdd', deck: '#aa8855', deckDark: '#997744',
      });
    },

    biltroy_dawn(ctx) {
      // Dawn sky — pink/purple gradient
      for (let y = 0; y < 120; y++) {
        const t = y / 120;
        const r = Math.floor(60 + t * 80);
        const g = Math.floor(30 + t * 50);
        const b = Math.floor(80 + t * 40);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, y, INTERNAL_W, 1);
      }
      // Sun peeking over horizon
      ctx.fillStyle = '#ffdd88';
      fillCircle(ctx, 200, 118, 14);
      ctx.fillStyle = '#ffcc66';
      fillCircle(ctx, 200, 118, 10);
      // Pink clouds
      ctx.fillStyle = '#cc8899';
      ctx.globalAlpha = 0.5;
      fillCircle(ctx, 60, 30, 12);
      fillCircle(ctx, 75, 27, 14);
      fillCircle(ctx, 160, 40, 10);
      fillCircle(ctx, 175, 37, 12);
      ctx.globalAlpha = 1;
      backgrounds._biltroy_structure(ctx, {
        grass: '#3a7a2a', grassDark: '#2a6a1a', trunk: '#443322',
        leaf: '#336622', leafDark: '#224411', siding: '#aa9988',
        sidingDark: '#998877', roof: '#666666', roofDark: '#555555',
        windowColor: '#667799', deck: '#887744', deckDark: '#776633',
      });
    },

    biltroy_day(ctx) {
      // Bright blue sky
      ctx.fillStyle = '#5599dd';
      ctx.fillRect(0, 0, INTERNAL_W, 120);
      // Sun high in sky
      ctx.fillStyle = '#ffee88';
      fillCircle(ctx, 128, 20, 12);
      ctx.fillStyle = '#ffff99';
      fillCircle(ctx, 128, 20, 8);
      // White clouds
      ctx.fillStyle = '#ddeeff';
      fillCircle(ctx, 40, 35, 12);
      fillCircle(ctx, 55, 31, 15);
      fillCircle(ctx, 70, 35, 11);
      fillCircle(ctx, 180, 25, 10);
      fillCircle(ctx, 195, 22, 13);
      backgrounds._biltroy_structure(ctx, {
        grass: '#5aaa3a', grassDark: '#4a9a2a', trunk: '#664433',
        leaf: '#55aa44', leafDark: '#338833', siding: '#ddccbb',
        sidingDark: '#ccbbaa', roof: '#888888', roofDark: '#777777',
        windowColor: '#99ccee', deck: '#bbaa66', deckDark: '#aa9955',
      });
    },

    biltroy_sunset(ctx) {
      // Orange/red sunset sky
      for (let y = 0; y < 120; y++) {
        const t = y / 120;
        const r = Math.floor(180 - t * 40);
        const g = Math.floor(80 + t * 30);
        const b = Math.floor(40 + t * 20);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, y, INTERNAL_W, 1);
      }
      // Setting sun
      ctx.fillStyle = '#ff6633';
      fillCircle(ctx, 50, 110, 16);
      ctx.fillStyle = '#ff8844';
      fillCircle(ctx, 50, 110, 12);
      ctx.fillStyle = '#ffaa55';
      fillCircle(ctx, 50, 110, 8);
      // Warm clouds
      ctx.fillStyle = '#cc6644';
      ctx.globalAlpha = 0.4;
      fillCircle(ctx, 90, 30, 14);
      fillCircle(ctx, 108, 26, 16);
      fillCircle(ctx, 200, 45, 12);
      ctx.globalAlpha = 1;
      backgrounds._biltroy_structure(ctx, {
        grass: '#4a7a2a', grassDark: '#3a6a1a', trunk: '#443322',
        leaf: '#447733', leafDark: '#335522', siding: '#bb9977',
        sidingDark: '#aa8866', roof: '#666655', roofDark: '#555544',
        windowColor: '#dd9966', deck: '#997744', deckDark: '#886633',
      });
      // Stage lights on the ground aimed at deck
      ctx.fillStyle = '#444444';
      ctx.fillRect(175, 132, 4, 3);
      ctx.fillRect(238, 132, 4, 3);
      ctx.fillStyle = '#ffdd44';
      ctx.fillRect(176, 131, 2, 1);
      ctx.fillStyle = '#ff4444';
      ctx.fillRect(239, 131, 2, 1);
    },

    biltroy_night(ctx) {
      // Dark night sky
      ctx.fillStyle = '#0a0a22';
      ctx.fillRect(0, 0, INTERNAL_W, 120);
      // Stars
      ctx.fillStyle = '#ffffff';
      let seed = 54321;
      for (let i = 0; i < 40; i++) {
        seed = (seed * 16807) % 2147483647;
        const sx = seed % INTERNAL_W;
        seed = (seed * 16807) % 2147483647;
        const sy = seed % 110;
        ctx.globalAlpha = 0.3 + (seed % 50) / 100;
        ctx.fillRect(sx, sy, 1, 1);
      }
      ctx.globalAlpha = 1;
      // Spooky moon
      ctx.fillStyle = '#ddeeff';
      fillCircle(ctx, 200, 30, 16);
      ctx.fillStyle = '#0a0a22';
      fillCircle(ctx, 206, 26, 14);
      // Moon glow
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = '#8888cc';
      fillCircle(ctx, 200, 30, 30);
      ctx.globalAlpha = 1;

      backgrounds._biltroy_structure(ctx, {
        grass: '#1a3a1a', grassDark: '#0a2a0a', trunk: '#221100',
        leaf: '#1a3311', leafDark: '#112208', siding: '#555544',
        sidingDark: '#444433', roof: '#333333', roofDark: '#222222',
        windowColor: '#ffcc44', deck: '#554422', deckDark: '#443311',
      });

      // Disco ball (above deck area)
      ctx.fillStyle = '#cccccc';
      fillCircle(ctx, 210, 78, 6);
      ctx.fillStyle = '#eeeeee';
      ctx.fillRect(208, 79, 2, 1);
      ctx.fillRect(211, 77, 2, 1);
      ctx.fillRect(213, 80, 1, 2);
      ctx.fillRect(207, 76, 1, 1);
      // String to roof
      ctx.fillStyle = '#888888';
      ctx.fillRect(210, 72, 1, 6);
      // Stage lights on ground
      ctx.fillStyle = '#333333';
      ctx.fillRect(170, 132, 5, 4);
      ctx.fillRect(240, 132, 5, 4);
      ctx.fillRect(155, 134, 4, 3);
      ctx.fillStyle = '#ff4444';
      ctx.fillRect(171, 131, 3, 1);
      ctx.fillStyle = '#4444ff';
      ctx.fillRect(241, 131, 3, 1);
      ctx.fillStyle = '#44ff44';
      ctx.fillRect(156, 133, 2, 1);
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

    biltroy(ctx, t) {
      // Bonfire — animated flames
      const fireX = 145;
      const fireY = 140;
      // Flickering flames
      for (let i = 0; i < 6; i++) {
        const fx = fireX - 3 + Math.sin(t / 100 + i * 1.5) * 3;
        const fy = fireY - 4 - i * 2 + Math.sin(t / 150 + i * 2) * 2;
        const colors = ['#ff4411', '#ff6622', '#ff8833', '#ffaa44', '#ffcc55', '#ffee88'];
        ctx.fillStyle = colors[i];
        ctx.globalAlpha = 0.8 - i * 0.08;
        const w = 6 - i * 0.5;
        ctx.fillRect(Math.floor(fx), Math.floor(fy), Math.ceil(w), 3);
      }
      // Sparks rising
      ctx.fillStyle = '#ffcc44';
      for (let i = 0; i < 5; i++) {
        const age = ((t / 20 + i * 25) % 80);
        const sx = fireX + Math.sin(t / 300 + i * 3) * (4 + age * 0.1);
        const sy = fireY - 8 - age;
        ctx.globalAlpha = Math.max(0, 0.7 - age * 0.01);
        ctx.fillRect(Math.floor(sx), Math.floor(sy), 1, 1);
      }
      // Fire glow on ground
      ctx.globalAlpha = 0.1 + Math.sin(t / 200) * 0.05;
      ctx.fillStyle = '#ff6633';
      fillCircle(ctx, fireX, fireY + 4, 14);
      ctx.globalAlpha = 1;

      // Rustling leaves on oak trees
      ctx.fillStyle = '#448833';
      for (let i = 0; i < 8; i++) {
        const seed = i * 37;
        const lx = (i < 4 ? 15 : 205) + Math.sin(t / 600 + seed) * 6;
        const ly = (i < 4 ? 40 : 55) + Math.sin(t / 800 + seed * 1.3) * 4 + (i % 4) * 8;
        ctx.globalAlpha = 0.5 + Math.sin(t / 500 + seed) * 0.2;
        ctx.fillRect(Math.floor(lx), Math.floor(ly), 2, 1);
      }
      // Falling leaf
      const leafCycle = 6000;
      const leafPhase = (t % leafCycle) / leafCycle;
      const leafX = 35 + leafPhase * 30 + Math.sin(leafPhase * 12) * 8;
      const leafY = 50 + leafPhase * 90;
      if (leafY < 140) {
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = '#88aa33';
        ctx.fillRect(Math.floor(leafX), Math.floor(leafY), 2, 1);
      }
      // Bird flying past
      const birdCycle = 10000;
      const birdX = ((t % birdCycle) / birdCycle) * (INTERNAL_W + 40) - 20;
      const birdY = 18 + Math.sin(t / 250) * 2;
      const wingUp = Math.sin(t / 100) > 0;
      ctx.fillStyle = '#333333';
      ctx.globalAlpha = 0.8;
      ctx.fillRect(Math.floor(birdX), Math.floor(birdY), 3, 1);
      if (wingUp) {
        ctx.fillRect(Math.floor(birdX) - 2, Math.floor(birdY) - 1, 2, 1);
        ctx.fillRect(Math.floor(birdX) + 3, Math.floor(birdY) - 1, 2, 1);
      } else {
        ctx.fillRect(Math.floor(birdX) - 2, Math.floor(birdY) + 1, 2, 1);
        ctx.fillRect(Math.floor(birdX) + 3, Math.floor(birdY) + 1, 2, 1);
      }
      // Grass swaying
      ctx.fillStyle = '#6aaa4a';
      for (let i = 0; i < 6; i++) {
        const gx = 10 + i * 45;
        const sway = Math.sin(t / 700 + i * 2) * 2;
        ctx.globalAlpha = 0.6;
        ctx.fillRect(Math.floor(gx + sway), 133, 1, 3);
        ctx.fillRect(Math.floor(gx + sway + 2), 132, 1, 4);
      }

      // Person going in/out of door
      const doorCycle = 15000;
      const doorPhase = (t % doorCycle) / doorCycle;
      // 0-0.1: walk to door from left, 0.1-0.15: at door, 0.15-0.2: go inside
      // 0.5-0.55: come out, 0.55-0.6: at door, 0.6-0.7: walk away right
      ctx.globalAlpha = 0.9;
      if (doorPhase < 0.1) {
        // Walking toward door from left
        const px = 90 + (doorPhase / 0.1) * 30;
        ctx.fillStyle = '#886644';
        ctx.fillRect(Math.floor(px), 120, 4, 8);
        ctx.fillStyle = '#ddbb88';
        ctx.fillRect(Math.floor(px), 117, 4, 3);
      } else if (doorPhase >= 0.1 && doorPhase < 0.2) {
        // At door / going in (shrink into doorway)
        const shrink = (doorPhase - 0.1) / 0.1;
        if (shrink < 0.5) {
          ctx.fillStyle = '#886644';
          ctx.fillRect(122, 120, 4, 8);
          ctx.fillStyle = '#ddbb88';
          ctx.fillRect(122, 117, 4, 3);
        }
      } else if (doorPhase >= 0.5 && doorPhase < 0.55) {
        // Coming out of door
        ctx.fillStyle = '#556688';
        ctx.fillRect(122, 120, 4, 8);
        ctx.fillStyle = '#ddbb88';
        ctx.fillRect(122, 117, 4, 3);
      } else if (doorPhase >= 0.55 && doorPhase < 0.7) {
        // Walking away to right
        const px = 122 + ((doorPhase - 0.55) / 0.15) * 40;
        ctx.fillStyle = '#556688';
        ctx.fillRect(Math.floor(px), 120, 4, 8);
        ctx.fillStyle = '#ddbb88';
        ctx.fillRect(Math.floor(px), 117, 4, 3);
      }

      // Second person, offset timing
      const door2Cycle = 22000;
      const door2Phase = (t % door2Cycle) / door2Cycle;
      if (door2Phase >= 0.3 && door2Phase < 0.38) {
        const px = 170 - ((door2Phase - 0.3) / 0.08) * 48;
        ctx.fillStyle = '#cc5544';
        ctx.fillRect(Math.floor(px), 119, 4, 9);
        ctx.fillStyle = '#ddbb88';
        ctx.fillRect(Math.floor(px), 116, 4, 3);
      } else if (door2Phase >= 0.38 && door2Phase < 0.42) {
        // At door going in
        if (door2Phase < 0.40) {
          ctx.fillStyle = '#cc5544';
          ctx.fillRect(122, 119, 4, 9);
          ctx.fillStyle = '#ddbb88';
          ctx.fillRect(122, 116, 4, 3);
        }
      } else if (door2Phase >= 0.7 && door2Phase < 0.74) {
        // Coming out
        ctx.fillStyle = '#cc5544';
        ctx.fillRect(122, 119, 4, 9);
        ctx.fillStyle = '#ddbb88';
        ctx.fillRect(122, 116, 4, 3);
      } else if (door2Phase >= 0.74 && door2Phase < 0.85) {
        const px = 122 - ((door2Phase - 0.74) / 0.11) * 50;
        ctx.fillStyle = '#cc5544';
        ctx.fillRect(Math.floor(px), 119, 4, 9);
        ctx.fillStyle = '#ddbb88';
        ctx.fillRect(Math.floor(px), 116, 4, 3);
      }

      // Window peek — someone looks out window occasionally
      const peekCycle = 18000;
      const peekPhase = (t % peekCycle) / peekCycle;
      if (peekPhase > 0.2 && peekPhase < 0.35) {
        // Face in first window
        ctx.fillStyle = '#ddbb88';
        ctx.globalAlpha = 0.8;
        ctx.fillRect(85, 97, 3, 3);
        ctx.fillStyle = '#111111';
        ctx.fillRect(85, 97, 1, 1);
        ctx.fillRect(87, 97, 1, 1);
      }
      if (peekPhase > 0.6 && peekPhase < 0.72) {
        // Face in third window
        ctx.fillStyle = '#ddbb88';
        ctx.globalAlpha = 0.8;
        ctx.fillRect(145, 97, 3, 3);
        ctx.fillStyle = '#111111';
        ctx.fillRect(145, 97, 1, 1);
        ctx.fillRect(147, 97, 1, 1);
      }

      // Window light turning on/off
      const lightCycle = 25000;
      const lightPhase = (t % lightCycle) / lightCycle;
      if (lightPhase > 0.3 && lightPhase < 0.7) {
        // Second window glows warm
        ctx.fillStyle = '#ffdd88';
        ctx.globalAlpha = 0.4;
        ctx.fillRect(100, 95, 14, 10);
      }
      if (lightPhase > 0.1 && lightPhase < 0.5) {
        // Fourth window glows warm
        ctx.fillStyle = '#ffdd88';
        ctx.globalAlpha = 0.35;
        ctx.fillRect(160, 95, 14, 10);
      }

      ctx.globalAlpha = 1;
    },

    biltroy_dawn(ctx, t) {
      bgAnimations.biltroy(ctx, t);
      // Chickens pecking around the yard
      for (let i = 0; i < 3; i++) {
        const cx = 60 + i * 40 + Math.sin(t / 1200 + i * 3) * 15;
        const cy = 142 + i * 4 + Math.sin(t / 800 + i * 2) * 2;
        const peck = Math.sin(t / 300 + i * 5) > 0.7;
        ctx.fillStyle = '#eeeeaa';
        ctx.globalAlpha = 0.9;
        // Body
        ctx.fillRect(Math.floor(cx), Math.floor(cy), 4, 3);
        // Head (up or pecking down)
        if (peck) {
          ctx.fillRect(Math.floor(cx) + 4, Math.floor(cy) + 2, 2, 1);
          ctx.fillStyle = '#dd6633';
          ctx.fillRect(Math.floor(cx) + 6, Math.floor(cy) + 2, 1, 1);
        } else {
          ctx.fillRect(Math.floor(cx) + 3, Math.floor(cy) - 1, 2, 2);
          ctx.fillStyle = '#dd6633';
          ctx.fillRect(Math.floor(cx) + 5, Math.floor(cy) - 1, 1, 1);
          // Comb
          ctx.fillStyle = '#cc3333';
          ctx.fillRect(Math.floor(cx) + 3, Math.floor(cy) - 2, 2, 1);
        }
        ctx.fillStyle = '#eeeeaa';
        // Legs
        ctx.fillStyle = '#dd9944';
        ctx.fillRect(Math.floor(cx) + 1, Math.floor(cy) + 3, 1, 2);
        ctx.fillRect(Math.floor(cx) + 3, Math.floor(cy) + 3, 1, 2);
      }
      ctx.globalAlpha = 1;
    },

    biltroy_day(ctx, t) {
      bgAnimations.biltroy(ctx, t);
      // Chickens (same as dawn but different positions)
      for (let i = 0; i < 4; i++) {
        const cx = 30 + i * 35 + Math.sin(t / 1000 + i * 2.5) * 18;
        const cy = 140 + (i % 3) * 5 + Math.sin(t / 700 + i * 1.8) * 2;
        const peck = Math.sin(t / 250 + i * 4) > 0.6;
        ctx.fillStyle = i < 2 ? '#eeeeaa' : '#cc8844';
        ctx.globalAlpha = 0.9;
        ctx.fillRect(Math.floor(cx), Math.floor(cy), 4, 3);
        if (peck) {
          ctx.fillRect(Math.floor(cx) + 4, Math.floor(cy) + 2, 2, 1);
          ctx.fillStyle = '#dd6633';
          ctx.fillRect(Math.floor(cx) + 6, Math.floor(cy) + 2, 1, 1);
        } else {
          ctx.fillRect(Math.floor(cx) + 3, Math.floor(cy) - 1, 2, 2);
          ctx.fillStyle = '#cc3333';
          ctx.fillRect(Math.floor(cx) + 3, Math.floor(cy) - 2, 2, 1);
        }
        ctx.fillStyle = '#dd9944';
        ctx.fillRect(Math.floor(cx) + 1, Math.floor(cy) + 3, 1, 2);
        ctx.fillRect(Math.floor(cx) + 3, Math.floor(cy) + 3, 1, 2);
      }
      ctx.globalAlpha = 1;
    },

    biltroy_sunset(ctx, t) {
      bgAnimations.biltroy(ctx, t);
      // Howling wolf silhouette on the left hill
      const wolfX = 8;
      const wolfY = 118;
      ctx.fillStyle = '#221100';
      ctx.globalAlpha = 0.9;
      // Body
      ctx.fillRect(wolfX, wolfY, 8, 4);
      // Head tilted up (howling)
      ctx.fillRect(wolfX + 7, wolfY - 3, 3, 4);
      // Snout up
      ctx.fillRect(wolfX + 9, wolfY - 5, 2, 3);
      // Ear
      ctx.fillRect(wolfX + 7, wolfY - 5, 1, 2);
      // Tail
      ctx.fillRect(wolfX - 2, wolfY - 1, 3, 1);
      ctx.fillRect(wolfX - 3, wolfY - 2, 2, 1);
      // Legs
      ctx.fillRect(wolfX + 1, wolfY + 4, 1, 3);
      ctx.fillRect(wolfX + 3, wolfY + 4, 1, 3);
      ctx.fillRect(wolfX + 5, wolfY + 4, 1, 3);
      ctx.fillRect(wolfX + 7, wolfY + 4, 1, 3);
      // Howl lines (animated)
      ctx.fillStyle = '#ffddaa';
      for (let i = 0; i < 3; i++) {
        const hx = wolfX + 12 + i * 3 + Math.sin(t / 400 + i) * 2;
        const hy = wolfY - 6 - i * 2;
        ctx.globalAlpha = 0.3 + Math.sin(t / 300 + i * 2) * 0.2;
        ctx.fillRect(Math.floor(hx), Math.floor(hy), 2, 1);
      }
      // Stage light beams (sunset)
      ctx.globalAlpha = 0.08 + Math.sin(t / 500) * 0.04;
      ctx.fillStyle = '#ffdd44';
      ctx.beginPath();
      ctx.moveTo(177, 131);
      ctx.lineTo(195, 95);
      ctx.lineTo(210, 95);
      ctx.lineTo(177, 131);
      ctx.fill();
      ctx.globalAlpha = 0.06 + Math.sin(t / 600 + 1) * 0.03;
      ctx.fillStyle = '#ff4444';
      ctx.beginPath();
      ctx.moveTo(240, 131);
      ctx.lineTo(220, 95);
      ctx.lineTo(205, 95);
      ctx.lineTo(240, 131);
      ctx.fill();
      ctx.globalAlpha = 1;
    },

    biltroy_night(ctx, t) {
      // Bonfire (bigger glow at night)
      const fireX = 145, fireY = 140;
      for (let i = 0; i < 6; i++) {
        const fx = fireX - 3 + Math.sin(t / 100 + i * 1.5) * 3;
        const fy = fireY - 4 - i * 2 + Math.sin(t / 150 + i * 2) * 2;
        const colors = ['#ff4411', '#ff6622', '#ff8833', '#ffaa44', '#ffcc55', '#ffee88'];
        ctx.fillStyle = colors[i];
        ctx.globalAlpha = 0.9 - i * 0.06;
        const w = 7 - i * 0.5;
        ctx.fillRect(Math.floor(fx), Math.floor(fy), Math.ceil(w), 3);
      }
      // Big sparks
      ctx.fillStyle = '#ffcc44';
      for (let i = 0; i < 8; i++) {
        const age = ((t / 18 + i * 20) % 100);
        const sx = fireX + Math.sin(t / 250 + i * 3) * (5 + age * 0.15);
        const sy = fireY - 10 - age;
        ctx.globalAlpha = Math.max(0, 0.8 - age * 0.008);
        ctx.fillRect(Math.floor(sx), Math.floor(sy), 1, 1);
      }
      // Big fire glow
      ctx.globalAlpha = 0.15 + Math.sin(t / 200) * 0.05;
      ctx.fillStyle = '#ff6633';
      fillCircle(ctx, fireX, fireY + 4, 20);

      // Twinkling stars
      let seed = 54321;
      for (let i = 0; i < 40; i++) {
        seed = (seed * 16807) % 2147483647;
        const sx = seed % INTERNAL_W;
        seed = (seed * 16807) % 2147483647;
        const sy = seed % 110;
        ctx.globalAlpha = 0.2 + Math.sin(t / 500 + i * 1.1) * 0.3;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(sx, sy, 1, 1);
      }

      // Disco ball light beams
      const dbx = 210, dby = 78;
      const beamColors = ['#ff4444', '#44ff44', '#4444ff', '#ffff44', '#ff44ff', '#44ffff'];
      for (let i = 0; i < 6; i++) {
        const angle = (t / 800 + i * 1.047) % (Math.PI * 2);
        const len = 40 + Math.sin(t / 600 + i) * 10;
        const ex = dbx + Math.cos(angle) * len;
        const ey = dby + Math.sin(angle) * len;
        ctx.strokeStyle = beamColors[i];
        ctx.globalAlpha = 0.15 + Math.sin(t / 300 + i * 2) * 0.08;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(dbx, dby);
        ctx.lineTo(Math.floor(ex), Math.floor(ey));
        ctx.stroke();
      }
      // Disco ball sparkle
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.5 + Math.sin(t / 150) * 0.3;
      ctx.fillRect(dbx - 1, dby - 1, 2, 2);
      ctx.globalAlpha = 0.3 + Math.sin(t / 200 + 1) * 0.2;
      ctx.fillRect(dbx + 2, dby, 1, 1);
      ctx.fillRect(dbx - 3, dby + 1, 1, 1);

      // Dance floor colored light patches on ground
      for (let i = 0; i < 4; i++) {
        const angle = (t / 1200 + i * 1.57) % (Math.PI * 2);
        const px = 210 + Math.cos(angle) * 25;
        const py = 130 + Math.sin(angle) * 8;
        ctx.fillStyle = beamColors[i % beamColors.length];
        ctx.globalAlpha = 0.08 + Math.sin(t / 400 + i) * 0.04;
        fillCircle(ctx, Math.floor(px), Math.floor(py), 8);
      }

      // Stage light beams (night - colorful, animated)
      const stageLights = [
        { x: 172, color: '#ff4444' },
        { x: 242, color: '#4444ff' },
        { x: 157, color: '#44ff44' },
      ];
      for (let i = 0; i < stageLights.length; i++) {
        const sl = stageLights[i];
        const sway = Math.sin(t / 800 + i * 2) * 8;
        ctx.fillStyle = sl.color;
        ctx.globalAlpha = 0.1 + Math.sin(t / 400 + i) * 0.05;
        ctx.beginPath();
        ctx.moveTo(sl.x, 131);
        ctx.lineTo(200 + sway, 85);
        ctx.lineTo(210 + sway, 85);
        ctx.lineTo(sl.x + 4, 131);
        ctx.fill();
      }

      // Bats flying across
      ctx.fillStyle = '#222233';
      for (let i = 0; i < 4; i++) {
        const batCycle = 8000 + i * 2000;
        const bx = ((t % batCycle) / batCycle) * (INTERNAL_W + 60) - 30;
        const by = 15 + i * 12 + Math.sin(t / 200 + i * 3) * 5;
        const wingUp = Math.sin(t / 80 + i * 4) > 0;
        ctx.globalAlpha = 0.8;
        ctx.fillRect(Math.floor(bx), Math.floor(by), 2, 1);
        if (wingUp) {
          ctx.fillRect(Math.floor(bx) - 3, Math.floor(by) - 1, 3, 1);
          ctx.fillRect(Math.floor(bx) + 2, Math.floor(by) - 1, 3, 1);
          ctx.fillRect(Math.floor(bx) - 4, Math.floor(by) - 2, 2, 1);
          ctx.fillRect(Math.floor(bx) + 4, Math.floor(by) - 2, 2, 1);
        } else {
          ctx.fillRect(Math.floor(bx) - 3, Math.floor(by) + 1, 3, 1);
          ctx.fillRect(Math.floor(bx) + 2, Math.floor(by) + 1, 3, 1);
        }
      }

      // Spooky clouds drifting past moon
      ctx.fillStyle = '#1a1a33';
      ctx.globalAlpha = 0.4;
      const sc1x = 160 + Math.sin(t / 10000) * 60;
      fillCircle(ctx, Math.floor(sc1x), 28, 12);
      fillCircle(ctx, Math.floor(sc1x) + 14, 24, 14);
      fillCircle(ctx, Math.floor(sc1x) + 28, 30, 10);
      ctx.globalAlpha = 0.25;
      const sc2x = 100 + Math.sin(t / 14000 + 3) * 80;
      fillCircle(ctx, Math.floor(sc2x), 50, 10);
      fillCircle(ctx, Math.floor(sc2x) + 12, 47, 12);

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

  // --- Smoke rendering (character touching fire) ---

  function drawSmoke(x, y, time, seed) {
    for (let i = 0; i < 6; i++) {
      const age = ((time / 25 + i * 18 + seed * 100) % 70);
      const sx = x + Math.sin(time / 400 + i * 2 + seed) * (3 + age * 0.08);
      const sy = y - age * 0.8;
      const size = 1 + Math.floor(age / 25);
      ctx.fillStyle = '#888888';
      ctx.globalAlpha = Math.max(0, 0.5 - age * 0.007);
      ctx.fillRect(Math.floor(sx), Math.floor(sy), size, size);
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
    drawBackground, drawProp, drawCharacter, drawCharacterWithOffset, drawEmoteBubble, drawMusicNotes, drawSmoke,
    drawDialogueBox, drawDialogueText, drawFadeOverlay,
    drawTitleOverlay, drawCreditsOverlay,
    getTextMaxWidth, getTextScale, getInternalSize,
    getBackgroundNames, renderBackgroundToCanvas,
  };
})();
