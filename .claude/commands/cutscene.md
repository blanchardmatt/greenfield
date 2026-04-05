# /cutscene — Generate pixel cutscene content from natural language

Parse `$ARGUMENTS` to determine the mode and description:
- If it starts with `character:` — generate a new character sprite
- If it starts with `background:` — generate a new background
- If it starts with `script:` — generate a new cutscene script
- If no prefix, infer the most likely mode from context

---

## Mode: Character

**Goal:** Generate a 16x24 pixel character sprite and add it to `js/sprites.js`.

**Steps:**
1. Read `js/sprites.js` to understand the existing format and color palette.
2. Generate a sprite matching the user's description.
3. Add it to the file and run `node build-html.js`.

**Rules:**
- Use the existing color shortcut variables: `BK` (black outlines), `SK` (skin), `SD` (skin dark), `WH` (white), `BR` (brown), `BD` (brown dark), `BL` (blue), `BU` (blue dark), `RD` (red), `GR` (green), `GD` (green dark), `GY` (gray), `GK` (gray dark), `YL` (yellow), `PP` (purple), `PD` (purple dark), `OR` (orange).
- If you need colors not in the palette, define new `const` variables following the naming convention (2-letter uppercase) near the existing ones.
- Use `_` for transparent pixels.
- The sprite is a 16-wide by 24-tall 2D array of color references.
- **Anatomy guide** (row ranges):
  - Rows 0-2: Hat/hair/helmet top
  - Rows 3-6: Face (eyes at row 4, mouth at row 6)
  - Row 7: Neck/collar
  - Rows 8-12: Torso (armor, clothing, arms extend from sides)
  - Rows 13-17: Legs (pants, skirt, robe)
  - Rows 18-20: Feet/boots
  - Rows 21-23: Empty padding (leave as all `_`)
- Use `BK` for ALL outlines — every visible region must be outlined in `BK`.
- Character should be roughly centered horizontally (columns 3-12 for the body).
- Create two frames: `name_f1` and `name_f2`. Frame 2 can be identical for static characters, or have slight leg position changes for walking animation.
- Add the frames to the `sprites` object: `name: [name_f1, name_f2]`
- Use snake_case for the sprite identifier.

**Insertion point:** Add the new sprite data BEFORE the `const sprites = {` line, and add the entry to the `sprites` object.

**After generating:** Run `node build-html.js` to rebuild `cutscene.html`.

---

## Mode: Background

**Goal:** Generate a procedural background drawing function and add it to `js/renderer.js`.

**Steps:**
1. Read `js/renderer.js` to understand the existing background format.
2. Generate a function matching the user's description.
3. Add it to the `backgrounds` object and run `node build-html.js`.

**Rules:**
- The function signature is: `name(ctx) { ... }`
- The canvas is 256x224 pixels (use `INTERNAL_W` and `INTERNAL_H` constants).
- Use these drawing primitives:
  - `ctx.fillStyle = '#hexcolor'` then `ctx.fillRect(x, y, w, h)`
  - `ctx.globalAlpha = value` (reset to 1.0 after use)
  - `fillCircle(ctx, cx, cy, r)` — helper available inside the Renderer IIFE
- Layer from back to front: sky/ceiling → ground → large structures → detail elements.
- Keep it simple — this is retro pixel art. Use solid colors and geometric shapes. No gradients except manual per-scanline fills.
- Use snake_case for the background identifier.

**Insertion point:** Add the new function inside the `const backgrounds = {` object in the Renderer IIFE, before the closing `};`.

**After generating:** Run `node build-html.js` to rebuild `cutscene.html`.

---

## Mode: Script

**Goal:** Generate a complete cutscene JSON script from a plot description.

**Steps:**
1. Read `js/sprites.js` to get available sprite names (check the `sprites` object keys).
2. Read `js/renderer.js` to get available background names (check the `backgrounds` object keys).
3. Read `scripts/demo.json` as a format reference.
4. Generate a JSON script and save it to `scripts/`.

**Rules:**
- The JSON structure must be:
  ```json
  {
    "title": "string",
    "settings": { "resolution": [256, 224], "textSpeed": 30 },
    "characters": {
      "id": { "sprite": "sprite_name", "name": "Display Name", "nameColor": "#hex" }
    },
    "scenes": [
      {
        "id": "scene_id",
        "background": "background_name",
        "actions": [ ... ]
      }
    ]
  }
  ```
- Valid action types and their fields:
  - `{ "type": "transition", "effect": "fadeIn"|"fadeOut"|"cut", "duration": ms }`
  - `{ "type": "enter", "character": "id", "from": "left"|"right"|"top"|"bottom", "to": {"x": n, "y": n}, "duration": ms }`
  - `{ "type": "exit", "character": "id", "to": "left"|"right"|"top"|"bottom", "duration": ms }`
  - `{ "type": "dialogue", "character": "id", "text": "string" }`
  - `{ "type": "wait", "duration": ms }`
  - `{ "type": "shake", "intensity": 1-10, "duration": ms }`
  - `{ "type": "emote", "character": "id", "emote": "surprise"|"anger"|"happy", "duration": ms }`
  - `{ "type": "move", "character": "id", "to": {"x": n, "y": n}, "duration": ms }`
  - `{ "type": "setBackground", "background": "name" }`
- Character positions: x is 0-256, y is typically 110-140 for standing on the ground.
- Only use sprite names and background names that actually exist in the codebase.
- Every scene should start with a `fadeIn` transition and end with a `fadeOut` transition.
- Use dramatic pacing: add `wait` actions between key moments, use `shake` for impact, `emote` for reactions.
- Save to `scripts/<kebab-case-title>.json`.
- If the story requires characters or backgrounds that don't exist yet, tell the user and offer to generate them first.

**After generating:** Tell the user the file path and how to play it (load via the editor or file input).
