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
const shardsJson = read('scripts/shards-of-the-sound.json');

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
<button id="btn-load">Load Script</button>
<input type="file" id="script-file" accept=".json,text/plain" style="display:none">
<button id="btn-demo">Demo</button>
<button id="btn-serenade">Serenade</button>
<button id="btn-shards">Shards</button>
<button id="btn-restart">Restart</button>
<div class="toolbar-sep" style="width:1px;height:20px;background:#333;margin:0 4px;display:inline-block"></div>
<button id="btn-record" style="background:#553333;border-color:#774444">Record</button>
<button id="btn-export-vid" style="background:#333355;border-color:#444477">Export Video</button>
</div>
<div id="record-status" style="font-size:11px;color:#cc5555;margin-top:4px;display:none">Recording...</div>
<div id="hint">Tap / Space to advance dialogue</div>
<script>
${fontJs}

${spritesJs}

${animationsJs}

${rendererJs}

${scriptParserJs}

const DEMO_SCRIPT = ${demoJson.trim()};

const SERENADE_SCRIPT = ${serenadeJson.trim()};

const SHARDS_SCRIPT = ${shardsJson.trim()};

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
  document.getElementById('btn-load').addEventListener('click', function() {
    document.getElementById('script-file').click();
  });
  document.getElementById('script-file').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function() {
      try {
        var text = reader.result;
        if (typeof text !== 'string') { alert('Error: could not read file as text'); return; }
        text = text.trim();
        var raw = JSON.parse(text);
        var parsed = ScriptParser.loadFromObject(raw);
        window._lastScript = parsed;
        CutsceneEngine.stop();
        CutsceneEngine.play(parsed);
      } catch (err) { alert('Error: ' + err.message + '\\nFirst 100 chars: ' + String(reader.result).substring(0, 100)); }
    };
    reader.readAsText(file, 'UTF-8');
  });
  document.getElementById('btn-demo').addEventListener('click', () => playScript(DEMO_SCRIPT));
  document.getElementById('btn-serenade').addEventListener('click', () => playScript(SERENADE_SCRIPT));
  document.getElementById('btn-shards').addEventListener('click', () => playScript(SHARDS_SCRIPT));
  document.getElementById('btn-restart').addEventListener('click', () => { if (window._lastScript) { CutsceneEngine.stop(); CutsceneEngine.play(window._lastScript); } });

  // --- Video Recording ---
  var mediaRecorder = null;
  var recordedChunks = [];
  var recordBtn = document.getElementById('btn-record');
  var exportBtn = document.getElementById('btn-export-vid');
  var statusEl = document.getElementById('record-status');

  recordBtn.addEventListener('click', function() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      return;
    }
    startRecording();
  });

  exportBtn.addEventListener('click', function() {
    if (!window._lastScript) { alert('Load a script first'); return; }
    startRecording();
    CutsceneEngine.stop();
    CutsceneEngine.play(window._lastScript, {
      autoAdvance: true,
      autoAdvanceDelay: 2000,
      onComplete: function() {
        setTimeout(function() {
          if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
          }
        }, 500);
      }
    });
  });

  function startRecording() {
    var canvas = document.getElementById('display-canvas');
    var stream = canvas.captureStream(30);
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
    mediaRecorder.ondataavailable = function(e) {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };
    mediaRecorder.onstop = function() {
      var blob = new Blob(recordedChunks, { type: 'video/webm' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'cutscene.webm';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      recordBtn.textContent = 'Record';
      recordBtn.style.background = '#553333';
      statusEl.style.display = 'none';
    };
    mediaRecorder.onerror = function(e) {
      alert('Recording error: ' + e.error);
      recordBtn.textContent = 'Record';
      statusEl.style.display = 'none';
    };
    mediaRecorder.start();
    recordBtn.textContent = 'Stop';
    recordBtn.style.background = '#cc3333';
    statusEl.style.display = 'block';
  }

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
