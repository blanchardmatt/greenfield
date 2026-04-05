#!/usr/bin/env node
/**
 * build-html.js — Assembles cutscene.html from source files.
 * Run: node build-html.js
 */
const fs = require('fs');
const path = require('path');

const BASE = __dirname;

function read(filePath) {
  return fs.readFileSync(path.join(BASE, filePath), 'utf8');
}

const css = read('css/style.css');
const fontJs = read('js/font.js');
const spritesJs = read('js/sprites.js');
const animationsJs = read('js/animations.js');
const rendererJs = read('js/renderer.js');
const scriptParserJs = read('js/script-parser.js');
const engineJs = read('js/engine.js');
const demoJson = read('scripts/demo.json');
const serenadeJson = read('scripts/the-serenade.json');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<title>Pixel Cutscene Renderer</title>
<style>
${css}
#display-canvas {
  width: 100%;
  height: auto;
}
#canvas-wrapper {
  max-width: 100%;
  width: 768px;
}
</style>
</head>
<body>
<h1>Pixel Cutscene Renderer</h1>
<div id="canvas-wrapper">
<canvas id="display-canvas" width="768" height="672"></canvas>
</div>
<div id="controls">
<label class="toolbar-btn" id="btn-load" style="font-family:monospace;font-size:13px;background:#2a2a4e;color:#aaa;border:1px solid #444;padding:6px 14px;cursor:pointer">Load Script <input type="file" id="script-file" accept=".json" style="display:none"></label>
<button id="btn-demo">Demo</button>
<button id="btn-serenade">Serenade</button>
<button id="btn-restart">Restart</button>
</div>
<div id="hint">Tap / Space to advance dialogue</div>
<script>
${fontJs}

${spritesJs}

${animationsJs}

${rendererJs}

${scriptParserJs}

const DEMO_SCRIPT = ${demoJson.trim()};

const SERENADE_SCRIPT = ${serenadeJson.trim()};

${engineJs}

// --- Self-contained page initialization ---
(function initPage() {
  const canvas = document.getElementById('display-canvas');
  Renderer.init(canvas);
  canvas.addEventListener('click', () => CutsceneEngine.handleInput('advance'));
  canvas.addEventListener('touchstart', (e) => { e.preventDefault(); CutsceneEngine.handleInput('advance'); });
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); CutsceneEngine.handleInput('advance'); }
    else if (e.code === 'Escape') CutsceneEngine.handleInput('skip');
  });
  document.getElementById('script-file').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function() {
      try {
        var raw = JSON.parse(reader.result);
        var parsed = ScriptParser.loadFromObject(raw);
        window._lastScript = parsed;
        CutsceneEngine.stop();
        CutsceneEngine.play(parsed);
      } catch (err) { alert('Error: ' + err.message); }
    };
    reader.readAsText(file);
  });
  document.getElementById('btn-demo').addEventListener('click', () => playScript(DEMO_SCRIPT));
  document.getElementById('btn-serenade').addEventListener('click', () => playScript(SERENADE_SCRIPT));
  document.getElementById('btn-restart').addEventListener('click', () => { if (window._lastScript) { CutsceneEngine.stop(); CutsceneEngine.play(window._lastScript); } });
  playScript(DEMO_SCRIPT);
  function playScript(data) {
    var parsed = ScriptParser.loadFromObject(data);
    window._lastScript = parsed;
    CutsceneEngine.stop();
    CutsceneEngine.play(parsed);
  }
})();
</script>
</body>
</html>`;

fs.writeFileSync(path.join(BASE, 'cutscene.html'), html);
console.log('Built cutscene.html (' + html.split('\n').length + ' lines)');
