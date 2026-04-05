/**
 * ScriptParser — Loads, validates, and normalizes cutscene JSON scripts.
 */
const ScriptParser = (() => {
  const VALID_ACTIONS = [
    'transition', 'enter', 'exit', 'dialogue', 'wait',
    'shake', 'emote', 'move', 'setBackground', 'title', 'credits',
    'mill', 'dance', 'joinDance', 'stopDance', 'showNotes', 'hideNotes', 'setScale',
    'showProp', 'hideProp', 'pin', 'unpin', 'ufoArrive', 'ufoDepart',
  ];

  const VALID_DIRECTIONS = ['left', 'right', 'top', 'bottom'];
  const VALID_EFFECTS = ['fadeIn', 'fadeOut', 'cut'];
  const VALID_EMOTES = ['surprise', 'anger', 'happy'];

  function validate(script) {
    const errors = [];

    if (!script.scenes || !Array.isArray(script.scenes) || script.scenes.length === 0) {
      errors.push('Script must have at least one scene.');
    }

    if (!script.characters || typeof script.characters !== 'object') {
      errors.push('Script must define a characters object.');
    }

    if (script.scenes) {
      for (let si = 0; si < script.scenes.length; si++) {
        const scene = script.scenes[si];
        if (!scene.actions || !Array.isArray(scene.actions)) {
          errors.push(`Scene ${si} must have an actions array.`);
          continue;
        }
        for (let ai = 0; ai < scene.actions.length; ai++) {
          const action = scene.actions[ai];
          if (!VALID_ACTIONS.includes(action.type)) {
            errors.push(`Scene ${si}, action ${ai}: unknown type "${action.type}".`);
          }
          if (action.character && !script.characters[action.character]) {
            errors.push(`Scene ${si}, action ${ai}: unknown character "${action.character}".`);
          }
        }
      }
    }

    return errors;
  }

  function normalize(script) {
    // Apply defaults
    const settings = Object.assign({
      resolution: [256, 224],
      textSpeed: 30,
      defaultTransition: 'fade',
    }, script.settings || {});

    const characters = {};
    for (const [id, def] of Object.entries(script.characters || {})) {
      characters[id] = {
        sprite: def.sprite || 'warrior',
        name: def.name || id,
        nameColor: def.nameColor || '#ffffff',
      };
    }

    const scenes = (script.scenes || []).map((scene, i) => ({
      id: scene.id || `scene_${i}`,
      background: scene.background || null,
      actions: scene.actions || [],
    }));

    return {
      title: script.title || 'Untitled Cutscene',
      settings,
      characters,
      scenes,
    };
  }

  async function loadFromUrl(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load script: ${response.statusText}`);
    const script = await response.json();
    return parse(script);
  }

  function loadFromObject(obj) {
    return parse(obj);
  }

  function parse(script) {
    const errors = validate(script);
    if (errors.length > 0) {
      throw new Error('Script validation errors:\n' + errors.join('\n'));
    }
    return normalize(script);
  }

  return { loadFromUrl, loadFromObject, validate };
})();
