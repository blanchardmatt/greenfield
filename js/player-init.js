/**
 * Player page initialization — wires up the player UI (index.html).
 * Separated from engine.js so the engine can be reused by the editor.
 */
(function initPage() {
  const canvas = document.getElementById('display-canvas');
  Renderer.init(canvas);

  // Input handlers
  canvas.addEventListener('click', () => {
    CutsceneEngine.handleInput('advance');
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      CutsceneEngine.handleInput('advance');
    } else if (e.code === 'Escape') {
      CutsceneEngine.handleInput('skip');
    }
  });

  // Load custom script from file input
  const scriptFile = document.getElementById('script-file');
  if (scriptFile) {
    scriptFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const raw = JSON.parse(evt.target.result);
          const parsed = ScriptParser.loadFromObject(raw);
          CutsceneEngine.stop();
          CutsceneEngine.play(parsed);
        } catch (err) {
          alert('Error loading script: ' + err.message);
        }
      };
      reader.readAsText(file);
    });
  }

  // Demo button
  document.getElementById('btn-demo').addEventListener('click', () => {
    loadDemo();
  });

  // Restart button
  document.getElementById('btn-restart').addEventListener('click', () => {
    if (window._lastScript) {
      CutsceneEngine.stop();
      CutsceneEngine.play(window._lastScript);
    }
  });

  // Auto-load demo
  loadDemo();

  async function loadDemo() {
    try {
      const parsed = await ScriptParser.loadFromUrl('scripts/demo.json');
      window._lastScript = parsed;
      CutsceneEngine.stop();
      CutsceneEngine.play(parsed);
    } catch (err) {
      console.warn('Could not load demo script:', err.message);
      console.info('Serve via HTTP server or load a script file manually.');
      Renderer.beginFrame();
      Renderer.drawBackground(null);
      Renderer.present();
    }
  }
})();
