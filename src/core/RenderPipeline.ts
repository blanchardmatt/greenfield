import type { EffectNode, FrameContext, ParameterValues } from './types';
import { GLContext } from './GLContext';
import { Clock } from './Clock';
import { FramebufferManager } from './FramebufferManager';
import { InputManager } from './InputManager';
import { ParameterStore } from './ParameterStore';
import { effectRegistry } from '../effects';

export class RenderPipeline {
  readonly glContext: GLContext;
  readonly gl: WebGL2RenderingContext;
  readonly fbManager: FramebufferManager;
  readonly clock: Clock;
  readonly inputManager: InputManager;
  readonly parameterStore: ParameterStore;
  readonly canvas: HTMLCanvasElement;

  private activeEffects: EffectNode[] = [];
  private activeIds: string[] = [];
  private rafId: number | null = null;
  private running = false;
  private width = 0;
  private height = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.glContext = new GLContext(canvas);
    this.gl = this.glContext.gl;
    this.fbManager = new FramebufferManager(this.gl);
    this.clock = new Clock();
    this.inputManager = new InputManager(canvas);
    this.parameterStore = new ParameterStore();

    this.handleResize();
  }

  setEffectChain(effectIds: string[]): void {
    // Smart diff: keep existing effect instances when their IDs are still in
    // the chain, dispose only those that were removed, and create only newly
    // added ones. Adding a new layer no longer resets prior layers.
    const oldById = new Map<string, EffectNode>();
    for (let i = 0; i < this.activeEffects.length; i++) {
      oldById.set(this.activeIds[i]!, this.activeEffects[i]!);
    }
    const newSet = new Set(effectIds);

    // Dispose effects that aren't in the new chain
    for (const [id, effect] of oldById) {
      if (!newSet.has(id)) {
        this.parameterStore.unregisterEffect(id);
        effect.dispose();
        oldById.delete(id);
      }
    }

    // Build the new chain in order, reusing where possible
    this.activeEffects = [];
    this.activeIds = [];
    for (const id of effectIds) {
      const existing = oldById.get(id);
      if (existing) {
        this.activeEffects.push(existing);
        this.activeIds.push(id);
        continue;
      }
      const factory = effectRegistry.get(id);
      if (!factory) {
        console.warn(`Unknown effect: ${id}`);
        continue;
      }
      const effect = factory();
      effect.init(this.gl);
      effect.resize(this.width, this.height);
      this.parameterStore.registerEffect(effect.descriptor.id, effect.descriptor);
      this.activeEffects.push(effect);
      this.activeIds.push(id);
    }
  }

  /** Tear down and recreate ALL active effects. Use for a global reset:
   *  vine canvases clear, particles reseed, feedback echo zeros, etc.
   *  Parameter values are preserved. */
  resetAll(): void {
    if (this.activeEffects.length === 0) return;
    // Snapshot params per effect (defaults will be replaced by recreated effect)
    const snapshot: Record<string, ReturnType<typeof this.parameterStore.getValues>> = {};
    for (const id of this.activeIds) {
      snapshot[id] = this.parameterStore.getValues(id);
    }
    const ids = [...this.activeIds];
    // Dispose everything
    for (const effect of this.activeEffects) {
      this.parameterStore.unregisterEffect(effect.descriptor.id);
      effect.dispose();
    }
    this.activeEffects = [];
    this.activeIds = [];
    // Recreate from scratch
    for (const id of ids) {
      const factory = effectRegistry.get(id);
      if (!factory) continue;
      const effect = factory();
      effect.init(this.gl);
      effect.resize(this.width, this.height);
      this.parameterStore.registerEffect(effect.descriptor.id, effect.descriptor);
      this.activeEffects.push(effect);
      this.activeIds.push(id);
    }
    // Restore params
    for (const id of ids) {
      if (snapshot[id]) {
        this.parameterStore.setValues(id, snapshot[id]!);
      }
    }
  }

  getActiveEffectIds(): string[] {
    return this.activeIds;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.inputManager.attach();
    this.clock.start();
    this.frame();
  }

  stop(): void {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.inputManager.detach();
  }

  private frame = (): void => {
    if (!this.running || this.glContext.isLost) {
      this.rafId = requestAnimationFrame(this.frame);
      return;
    }

    this.clock.tick();
    const input = this.inputManager.poll();

    const ctx: FrameContext = {
      gl: this.gl,
      time: this.clock.time,
      deltaTime: this.clock.deltaTime,
      frameCount: this.clock.frameCount,
      resolution: [this.width, this.height],
      input,
    };

    const { gl } = this;

    if (this.activeEffects.length === 0) {
      // No effects — clear to dark
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, this.width, this.height);
      gl.clearColor(0.05, 0.05, 0.08, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    } else {
      // Chain effects
      const acquired: Array<ReturnType<FramebufferManager['acquire']>> = [];
      let prevTexture: WebGLTexture | null = null;

      for (let i = 0; i < this.activeEffects.length; i++) {
        const effect = this.activeEffects[i]!;
        const isLast = i === this.activeEffects.length - 1;
        const params: ParameterValues = this.parameterStore.getValues(effect.descriptor.id);

        const inputTextures = new Map<string, WebGLTexture>();
        if (prevTexture) {
          inputTextures.set('input0', prevTexture);
        }

        if (isLast) {
          // Render to screen
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          gl.viewport(0, 0, this.width, this.height);
        } else {
          // Render to FBO
          const fbo = this.fbManager.acquire(this.width, this.height);
          acquired.push(fbo);
          gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.fbo);
          gl.viewport(0, 0, this.width, this.height);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }

        effect.render(ctx, params, inputTextures);

        if (!isLast) {
          prevTexture = effect.getOutputTexture() ?? acquired[acquired.length - 1]!.texture;
        }
      }

      // Release intermediate FBOs
      for (const fbo of acquired) {
        this.fbManager.release(fbo);
      }
    }

    this.rafId = requestAnimationFrame(this.frame);
  };

  handleResize(): void {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.width = Math.floor(rect.width * dpr);
    this.height = Math.floor(rect.height * dpr);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.fbManager.handleResize();
    for (const effect of this.activeEffects) {
      effect.resize(this.width, this.height);
    }
  }

  dispose(): void {
    this.stop();
    for (const effect of this.activeEffects) {
      effect.dispose();
    }
    this.activeEffects = [];
    this.fbManager.dispose();
    this.glContext.dispose();
  }
}
