/**
 * AnimationSystem — Manages tweens, screen effects, and typewriter text.
 */
const AnimationSystem = (() => {
  const activeTweens = [];

  // Camera state for shake effect
  const camera = { offsetX: 0, offsetY: 0 };
  let shakeIntensity = 0;
  let shakeDuration = 0;
  let shakeElapsed = 0;

  // Fade overlay
  let fadeAlpha = 1.0; // start black
  let fadeTween = null;

  // Typewriter state
  const typewriter = {
    text: '',
    revealedCount: 0,
    speed: 30, // ms per character
    elapsed: 0,
    done: true,
    lines: [],
    maxWidth: 0,
    scale: 1,
  };

  function addTween(target, property, from, to, duration, easing = 'linear') {
    const tween = { target, property, from, to, duration, elapsed: 0, easing, done: false };
    target[property] = from;
    activeTweens.push(tween);
    return tween;
  }

  function ease(t, type) {
    switch (type) {
      case 'easeIn': return t * t;
      case 'easeOut': return 1 - (1 - t) * (1 - t);
      case 'easeInOut': return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      default: return t; // linear
    }
  }

  function update(dt) {
    // Update tweens
    for (let i = activeTweens.length - 1; i >= 0; i--) {
      const tw = activeTweens[i];
      tw.elapsed += dt;
      const progress = Math.min(tw.elapsed / tw.duration, 1);
      const t = ease(progress, tw.easing);
      tw.target[tw.property] = tw.from + (tw.to - tw.from) * t;
      if (progress >= 1) {
        tw.done = true;
        activeTweens.splice(i, 1);
      }
    }

    // Update shake
    if (shakeElapsed < shakeDuration) {
      shakeElapsed += dt;
      const remaining = 1 - shakeElapsed / shakeDuration;
      camera.offsetX = (Math.random() * 2 - 1) * shakeIntensity * remaining;
      camera.offsetY = (Math.random() * 2 - 1) * shakeIntensity * remaining;
    } else {
      camera.offsetX = 0;
      camera.offsetY = 0;
    }

    // Update fade tween
    if (fadeTween && !fadeTween.done) {
      // handled by tween system via fadeState
    }

    // Update typewriter
    if (!typewriter.done) {
      typewriter.elapsed += dt;
      const charsToReveal = Math.floor(typewriter.elapsed / typewriter.speed);
      typewriter.revealedCount = Math.min(charsToReveal, typewriter.text.length);
      if (typewriter.revealedCount >= typewriter.text.length) {
        typewriter.done = true;
      }
    }
  }

  // Fade state object that tween system can target
  const fadeState = { alpha: 1.0 };

  function startFade(fromAlpha, toAlpha, duration) {
    fadeState.alpha = fromAlpha;
    fadeTween = addTween(fadeState, 'alpha', fromAlpha, toAlpha, duration, 'easeInOut');
    return fadeTween;
  }

  function getFadeAlpha() {
    return fadeState.alpha;
  }

  function startShake(intensity, duration) {
    shakeIntensity = intensity;
    shakeDuration = duration;
    shakeElapsed = 0;
  }

  function isShaking() {
    return shakeElapsed < shakeDuration;
  }

  function startTypewriter(text, speed, maxWidth, scale) {
    typewriter.text = text;
    typewriter.revealedCount = 0;
    typewriter.speed = speed;
    typewriter.elapsed = 0;
    typewriter.done = false;
    typewriter.maxWidth = maxWidth;
    typewriter.scale = scale;
    typewriter.lines = PixelFont.wrapText(text, maxWidth, scale);
  }

  function completeTypewriter() {
    typewriter.revealedCount = typewriter.text.length;
    typewriter.done = true;
  }

  function getTypewriterState() {
    return {
      lines: typewriter.lines,
      revealedCount: typewriter.revealedCount,
      done: typewriter.done,
      text: typewriter.text,
      scale: typewriter.scale,
    };
  }

  function getCamera() {
    return camera;
  }

  function isTweenActive(tween) {
    return tween && !tween.done;
  }

  function clear() {
    activeTweens.length = 0;
    camera.offsetX = 0;
    camera.offsetY = 0;
    shakeElapsed = shakeDuration;
    fadeState.alpha = 0;
    fadeTween = null;
    typewriter.done = true;
  }

  return {
    addTween, update, startFade, getFadeAlpha, startShake, isShaking,
    startTypewriter, completeTypewriter, getTypewriterState,
    getCamera, isTweenActive, clear,
  };
})();
