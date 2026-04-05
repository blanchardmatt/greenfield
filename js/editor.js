/**
 * CutsceneEditor — Browser-based editor for creating and previewing cutscene scripts.
 */
const CutsceneEditor = (() => {
  let currentScript = null;
  let activeTab = 'script';
  let validationTimer = null;

  function init() {
    setupTabs();
    setupControls();
    setupScriptEditor();
    renderSpriteGallery();
    renderBackgroundGallery();
    loadDefaultScript();
  }

  // --- Tab Management ---

  function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.getElementById('tab-' + activeTab).classList.add('active');
      });
    });
  }

  // --- Playback Controls ---

  function setupControls() {
    document.getElementById('btn-play').addEventListener('click', () => {
      const json = document.getElementById('script-textarea').value;
      tryPlay(json);
    });

    document.getElementById('btn-pause').addEventListener('click', () => {
      CutsceneEngine.pause();
      updateStateDisplay();
    });

    document.getElementById('btn-step').addEventListener('click', () => {
      CutsceneEngine.step();
      updateStateDisplay();
    });

    document.getElementById('btn-ed-restart').addEventListener('click', () => {
      const json = document.getElementById('script-textarea').value;
      tryPlay(json);
    });

    document.getElementById('btn-save-json').addEventListener('click', exportJSON);
    document.getElementById('btn-export-html').addEventListener('click', exportHTML);
    document.getElementById('btn-load-json').addEventListener('click', () => {
      document.getElementById('json-file-input').click();
    });

    document.getElementById('json-file-input').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        document.getElementById('script-textarea').value = evt.target.result;
        tryPlay(evt.target.result);
      };
      reader.readAsText(file);
    });

    // Canvas click to advance
    const canvas = document.getElementById('preview-canvas');
    canvas.addEventListener('click', () => CutsceneEngine.handleInput('advance'));
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      CutsceneEngine.handleInput('advance');
    });

    document.addEventListener('keydown', (e) => {
      // Only handle keys when not typing in textarea
      if (e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        CutsceneEngine.handleInput('advance');
      } else if (e.code === 'Escape') {
        CutsceneEngine.handleInput('skip');
      }
    });
  }

  // --- Script Editor ---

  function setupScriptEditor() {
    const textarea = document.getElementById('script-textarea');
    textarea.addEventListener('input', () => {
      clearTimeout(validationTimer);
      validationTimer = setTimeout(() => validateScript(textarea.value), 400);
    });
  }

  function validateScript(jsonStr) {
    const errorEl = document.getElementById('validation-errors');
    try {
      const raw = JSON.parse(jsonStr);
      const errors = ScriptParser.validate(raw);
      if (errors.length > 0) {
        errorEl.textContent = errors.join('\n');
        errorEl.className = 'validation-msg error';
      } else {
        errorEl.textContent = 'Valid script';
        errorEl.className = 'validation-msg ok';
      }
    } catch (e) {
      errorEl.textContent = 'JSON parse error: ' + e.message;
      errorEl.className = 'validation-msg error';
    }
  }

  function tryPlay(jsonStr) {
    const errorEl = document.getElementById('validation-errors');
    try {
      const raw = JSON.parse(jsonStr);
      const parsed = ScriptParser.loadFromObject(raw);
      currentScript = parsed;
      CutsceneEngine.stop();
      CutsceneEngine.play(parsed);
      errorEl.textContent = 'Playing...';
      errorEl.className = 'validation-msg ok';
      startStateUpdater();
    } catch (e) {
      errorEl.textContent = e.message;
      errorEl.className = 'validation-msg error';
    }
  }

  // --- State Display ---

  let stateInterval = null;

  function startStateUpdater() {
    if (stateInterval) clearInterval(stateInterval);
    stateInterval = setInterval(updateStateDisplay, 250);
  }

  function updateStateDisplay() {
    const state = CutsceneEngine.getState();
    const el = document.getElementById('state-display');
    if (el) {
      el.textContent = `Scene: ${state.sceneIndex} | Action: ${state.actionIndex} | ${state.running ? 'Playing' : 'Paused'}${state.waitingForInput ? ' (waiting for input)' : ''}`;
    }
    if (!state.running && stateInterval) {
      clearInterval(stateInterval);
      stateInterval = null;
    }
  }

  // --- Sprite Gallery ---

  function renderSpriteGallery() {
    const container = document.getElementById('sprite-gallery');
    container.innerHTML = '';
    const names = SpriteLibrary.getSpriteNames();
    for (const name of names) {
      const item = document.createElement('div');
      item.className = 'gallery-item';

      const canvas = document.createElement('canvas');
      canvas.width = SpriteLibrary.W * 3;
      canvas.height = SpriteLibrary.H * 3;
      canvas.className = 'sprite-thumb';
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;

      // Draw to tiny canvas then scale
      const tiny = document.createElement('canvas');
      tiny.width = SpriteLibrary.W;
      tiny.height = SpriteLibrary.H;
      const tCtx = tiny.getContext('2d');
      SpriteLibrary.drawSprite(tCtx, name, 0, 0, 0);
      ctx.drawImage(tiny, 0, 0, canvas.width, canvas.height);

      const label = document.createElement('div');
      label.className = 'gallery-label';
      label.textContent = name;

      item.appendChild(canvas);
      item.appendChild(label);
      item.addEventListener('click', () => {
        navigator.clipboard.writeText(name).catch(() => {});
        label.textContent = 'Copied!';
        setTimeout(() => { label.textContent = name; }, 1000);
      });
      container.appendChild(item);
    }
  }

  // --- Background Gallery ---

  function renderBackgroundGallery() {
    const container = document.getElementById('bg-gallery');
    container.innerHTML = '';
    const names = Renderer.getBackgroundNames();
    for (const name of names) {
      const item = document.createElement('div');
      item.className = 'gallery-item bg-item';

      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 112;
      canvas.className = 'bg-thumb';
      Renderer.renderBackgroundToCanvas(name, canvas);

      const label = document.createElement('div');
      label.className = 'gallery-label';
      label.textContent = name;

      item.appendChild(canvas);
      item.appendChild(label);
      item.addEventListener('click', () => {
        navigator.clipboard.writeText(name).catch(() => {});
        label.textContent = 'Copied!';
        setTimeout(() => { label.textContent = name; }, 1000);
      });
      container.appendChild(item);
    }
  }

  // --- Export ---

  function exportJSON() {
    const json = document.getElementById('script-textarea').value;
    try {
      JSON.parse(json); // validate
    } catch (e) {
      alert('Fix JSON errors before exporting.');
      return;
    }
    const blob = new Blob([json], { type: 'application/json' });
    downloadBlob(blob, 'cutscene-script.json');
  }

  function exportHTML() {
    const json = document.getElementById('script-textarea').value;
    try {
      JSON.parse(json);
    } catch (e) {
      alert('Fix JSON errors before exporting.');
      return;
    }

    // Gather all script sources from the page
    const scriptSources = [];
    document.querySelectorAll('script[src]').forEach(s => {
      scriptSources.push(s.src);
    });

    // Build self-contained HTML with inline script
    // We'll fetch each JS file and inline it
    const fetches = ['js/font.js', 'js/sprites.js', 'js/animations.js', 'js/renderer.js', 'js/script-parser.js', 'js/engine.js']
      .map(f => fetch(f).then(r => r.text()));

    Promise.all(fetches).then(([fontJs, spritesJs, animationsJs, rendererJs, scriptParserJs, engineJs]) => {
      const html = buildSelfContainedHTML(fontJs, spritesJs, animationsJs, rendererJs, scriptParserJs, engineJs, json);
      const blob = new Blob([html], { type: 'text/html' });
      downloadBlob(blob, 'cutscene.html');
    }).catch(err => {
      alert('Export failed: ' + err.message);
    });
  }

  function buildSelfContainedHTML(fontJs, spritesJs, animationsJs, rendererJs, scriptParserJs, engineJs, scriptJson) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<title>Pixel Cutscene</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a0f;color:#c0c0c0;font-family:monospace;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:10px}
h1{font-size:16px;color:#8888cc;margin-bottom:8px;letter-spacing:2px;text-transform:uppercase}
#canvas-wrapper{position:relative;border:3px solid #333;box-shadow:0 0 20px rgba(80,80,160,0.3);background:#000;cursor:pointer;max-width:100%;width:768px}
#display-canvas{display:block;image-rendering:pixelated;image-rendering:crisp-edges;width:100%;height:auto}
#hint{margin-top:8px;font-size:11px;color:#555}
</style>
</head>
<body>
<h1>Pixel Cutscene</h1>
<div id="canvas-wrapper"><canvas id="display-canvas" width="768" height="672"></canvas></div>
<div id="hint">Tap / Space to advance dialogue</div>
<script>
${fontJs}
${spritesJs}
${animationsJs}
${rendererJs}
${scriptParserJs}
const DEMO_SCRIPT = ${scriptJson};
${engineJs}
(function(){
  var c=document.getElementById('display-canvas');
  Renderer.init(c);
  c.addEventListener('click',function(){CutsceneEngine.handleInput('advance')});
  c.addEventListener('touchstart',function(e){e.preventDefault();CutsceneEngine.handleInput('advance')});
  document.addEventListener('keydown',function(e){
    if(e.code==='Space'||e.code==='Enter'){e.preventDefault();CutsceneEngine.handleInput('advance')}
    else if(e.code==='Escape')CutsceneEngine.handleInput('skip');
  });
  var p=ScriptParser.loadFromObject(DEMO_SCRIPT);
  CutsceneEngine.play(p);
})();
</script>
</body>
</html>`;
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // --- Default Script ---

  function loadDefaultScript() {
    const defaultScript = {
      title: "New Cutscene",
      settings: { resolution: [256, 224], textSpeed: 30 },
      characters: {
        hero: { sprite: "warrior", name: "Hero", nameColor: "#55aaff" }
      },
      scenes: [
        {
          id: "scene1",
          background: "forest",
          actions: [
            { type: "transition", effect: "fadeIn", duration: 1000 },
            { type: "enter", character: "hero", from: "left", to: { x: 120, y: 130 }, duration: 800 },
            { type: "dialogue", character: "hero", text: "Edit this script to create your own cutscene!" },
            { type: "transition", effect: "fadeOut", duration: 1000 }
          ]
        }
      ]
    };
    document.getElementById('script-textarea').value = JSON.stringify(defaultScript, null, 2);
  }

  return { init };
})();
