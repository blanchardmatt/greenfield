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
#controls {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  padding: 8px 4px;
  max-width: 768px;
}
#controls button, #controls .toolbar-sep {
  font-family: monospace;
  font-size: 12px;
  background: #2a2a4e;
  color: #aaa;
  border: 1px solid #444;
  padding: 5px 10px;
  cursor: pointer;
}
#controls button:hover { background: #3a3a5e; color: #ccc; }
</style>
</head>
<body>
<h1>Pixel Cutscene Renderer</h1>
<div id="canvas-wrapper">
<canvas id="display-canvas" width="768" height="672"></canvas>
</div>
<div id="controls">
<input type="file" id="script-file" accept=".json,text/plain" style="display:none">
<button id="btn-demo">Demo</button>
<button id="btn-serenade">Serenade</button>
<button id="btn-shards">Shards</button>
<button id="btn-load">Load</button>
<button id="btn-restart">Restart</button>
<button id="btn-prev">Prev</button>
<button id="btn-next">Next</button>
<button id="btn-autoplay" style="background:#335533;border-color:#557755">Auto</button>
<button id="btn-vertical" style="background:#3366aa;border-color:#5588cc;color:#fff">9:16</button>
<button id="btn-record" style="background:#553333;border-color:#774444">Record</button>
<button id="btn-export-vid" style="background:#333355;border-color:#444477">Export</button>
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

  // --- Scene navigation ---
  document.getElementById('btn-prev').addEventListener('click', () => CutsceneEngine.prevScene());
  document.getElementById('btn-next').addEventListener('click', () => CutsceneEngine.nextScene());

  // --- Auto-play toggle ---
  var autoPlayBtn = document.getElementById('btn-autoplay');
  autoPlayBtn.addEventListener('click', function() {
    var isAuto = CutsceneEngine.getAutoAdvance();
    CutsceneEngine.setAutoAdvance(!isAuto, 2500);
    updateAutoPlayBtn();
  });
  function updateAutoPlayBtn() {
    var isAuto = CutsceneEngine.getAutoAdvance();
    autoPlayBtn.textContent = isAuto ? 'Manual' : 'Auto';
    autoPlayBtn.style.background = isAuto ? '#553355' : '#335533';
    autoPlayBtn.style.borderColor = isAuto ? '#775577' : '#557755';
  }

  // --- Vertical mode toggle ---
  var vertBtn = document.getElementById('btn-vertical');
  vertBtn.addEventListener('click', function() {
    var isVert = Renderer.isVertical();
    Renderer.setVerticalMode(!isVert);
    updateVertBtn();
    // Replay current script with new dimensions
    if (window._lastScript) {
      CutsceneEngine.stop();
      CutsceneEngine.play(window._lastScript);
    }
  });
  function updateVertBtn() {
    var isVert = Renderer.isVertical();
    vertBtn.textContent = isVert ? '16:9' : '9:16';
    vertBtn.style.background = isVert ? '#554433' : '#334455';
    vertBtn.style.borderColor = isVert ? '#776655' : '#556677';
  }

  // --- Video Recording ---
  var mediaRecorder = null;
  var recordedChunks = [];
  var recordBtn = document.getElementById('btn-record');
  var exportBtn = document.getElementById('btn-export-vid');
  var statusEl = document.getElementById('record-status');

  recordBtn.addEventListener('click', function() {
    if (webCodecsRecording) {
      stopWebCodecsRecording();
      return;
    }
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
          if (webCodecsRecording) {
            stopWebCodecsRecording();
          } else if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
          }
        }, 500);
      }
    });
  });

  // Detect best video format — try MP4 first (Chrome 123+, Safari)
  function getVideoFormat() {
    var formats = [
      { mimeType: 'video/mp4;codecs="avc1.42E01E"', ext: 'mp4', type: 'video/mp4' },
      { mimeType: 'video/mp4;codecs=avc1.42E01E', ext: 'mp4', type: 'video/mp4' },
      { mimeType: 'video/mp4;codecs=avc1', ext: 'mp4', type: 'video/mp4' },
      { mimeType: 'video/mp4', ext: 'mp4', type: 'video/mp4' },
      { mimeType: 'video/webm;codecs=vp9', ext: 'webm', type: 'video/webm' },
      { mimeType: 'video/webm;codecs=vp8', ext: 'webm', type: 'video/webm' },
      { mimeType: 'video/webm', ext: 'webm', type: 'video/webm' },
    ];
    for (var i = 0; i < formats.length; i++) {
      try {
        if (MediaRecorder.isTypeSupported(formats[i].mimeType)) {
          return formats[i];
        }
      } catch(e) {}
    }
    return { mimeType: '', ext: 'webm', type: 'video/webm' };
  }

  // Check if WebCodecs MP4 export is available (Chrome with no MP4 MediaRecorder)
  var canUseWebCodecs = (typeof VideoEncoder !== 'undefined');
  var mp4MuxerLoaded = false;
  var mp4MuxerModule = null;

  function loadMp4Muxer(callback) {
    if (mp4MuxerLoaded) { callback(); return; }
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mp4-muxer@5.1.3/build/mp4-muxer.min.js';
    script.onload = function() {
      mp4MuxerLoaded = true;
      mp4MuxerModule = window.Mp4Muxer;
      callback();
    };
    script.onerror = function() {
      alert('Could not load MP4 encoder. Falling back to WebM.');
      startMediaRecorderRecording();
    };
    document.head.appendChild(script);
  }

  function startRecording() {
    var fmt = getVideoFormat();
    if (fmt.ext === 'mp4') {
      // Native MP4 MediaRecorder (Safari, Chrome 123+)
      startMediaRecorderRecording();
    } else if (canUseWebCodecs) {
      // Chrome without MP4 MediaRecorder — use WebCodecs + mp4-muxer
      loadMp4Muxer(function() { startWebCodecsRecording(); });
    } else {
      // Fallback to WebM
      startMediaRecorderRecording();
    }
  }

  function startMediaRecorderRecording() {
    var canvas = document.getElementById('display-canvas');
    var stream = canvas.captureStream(30);
    var fmt = getVideoFormat();
    recordedChunks = [];
    var options = {};
    if (fmt.mimeType && MediaRecorder.isTypeSupported(fmt.mimeType)) {
      options.mimeType = fmt.mimeType;
    }
    mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = function(e) {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };
    mediaRecorder.onstop = function() {
      var blob = new Blob(recordedChunks, { type: fmt.type });
      downloadBlob(blob, 'cutscene.' + fmt.ext);
      recordBtn.textContent = 'Record';
      recordBtn.style.background = '#553333';
      statusEl.style.display = 'none';
    };
    mediaRecorder.onerror = function(e) {
      alert('Recording error: ' + (e.error || e.message || 'unknown'));
      recordBtn.textContent = 'Record';
      statusEl.style.display = 'none';
    };
    mediaRecorder.start(1000);
    recordBtn.textContent = 'Stop';
    recordBtn.style.background = '#cc3333';
    statusEl.style.display = 'block';
    statusEl.textContent = 'Recording (' + fmt.ext.toUpperCase() + ')...';
  }

  // WebCodecs-based MP4 recording (Chrome)
  var webCodecsRecording = false;
  var webCodecsEncoder = null;
  var webCodecsMuxer = null;

  function startWebCodecsRecording() {
    var canvas = document.getElementById('display-canvas');
    var w = canvas.width;
    var h = canvas.height;
    // Ensure dimensions are even (H.264 requirement)
    w = w % 2 === 0 ? w : w - 1;
    h = h % 2 === 0 ? h : h - 1;
    var fps = 30;

    var target = new Mp4Muxer.ArrayBufferTarget();
    webCodecsMuxer = new Mp4Muxer.Muxer({
      target: target,
      video: { codec: 'avc', width: w, height: h },
      fastStart: 'in-memory',
    });

    webCodecsEncoder = new VideoEncoder({
      output: function(chunk, meta) {
        webCodecsMuxer.addVideoChunk(chunk, meta);
      },
      error: function(e) {
        alert('Encoder error: ' + e.message);
        stopWebCodecsRecording();
      }
    });

    webCodecsEncoder.configure({
      codec: 'avc1.42E01E',
      width: w,
      height: h,
      bitrate: 4000000,
      framerate: fps,
    });

    webCodecsRecording = true;
    var frameCount = 0;
    var interval = 1000 / fps;

    function captureFrame() {
      if (!webCodecsRecording) return;
      try {
        var frame = new VideoFrame(canvas, {
          timestamp: frameCount * interval * 1000,
        });
        var keyFrame = frameCount % 60 === 0;
        webCodecsEncoder.encode(frame, { keyFrame: keyFrame });
        frame.close();
        frameCount++;
      } catch(e) {}
      setTimeout(captureFrame, interval);
    }

    captureFrame();
    recordBtn.textContent = 'Stop';
    recordBtn.style.background = '#cc3333';
    statusEl.style.display = 'block';
    statusEl.textContent = 'Recording (MP4)...';

    // Store target reference for download
    webCodecsMuxer._target = target;
  }

  function stopWebCodecsRecording() {
    webCodecsRecording = false;
    if (webCodecsEncoder) {
      webCodecsEncoder.flush().then(function() {
        webCodecsMuxer.finalize();
        var buf = webCodecsMuxer._target.buffer;
        var blob = new Blob([buf], { type: 'video/mp4' });
        downloadBlob(blob, 'cutscene.mp4');
        webCodecsEncoder.close();
        webCodecsEncoder = null;
        webCodecsMuxer = null;
        recordBtn.textContent = 'Record';
        recordBtn.style.background = '#553333';
        statusEl.style.display = 'none';
      });
    }
  }

  function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
