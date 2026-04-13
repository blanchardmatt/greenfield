import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { BaseEffect } from './BaseEffect';
import vertSrc from '../shaders/common/fullscreen-quad.vert?raw';
import fragSrc from '../shaders/feedback/feedback.frag?raw';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'feedback-echo',
  name: 'Feedback Echo',
  description: 'Frame-buffer feedback with decay, zoom, rotation, and color shifting',
  parameters: [
    { id: 'decay', type: 'float', label: 'Decay', min: 0.8, max: 1.0, step: 0.001, default: 0.97, group: 'Feedback' },
    { id: 'zoom', type: 'float', label: 'Zoom', min: 0.95, max: 1.05, step: 0.001, default: 0.995, group: 'Transform' },
    { id: 'rotation', type: 'float', label: 'Rotation', min: -0.1, max: 0.1, step: 0.0001, default: 0.003, group: 'Transform' },
    { id: 'blurAmount', type: 'float', label: 'Blur', min: 0, max: 5, step: 0.1, default: 1.0, group: 'Feedback' },
    { id: 'colorShiftSpeed', type: 'float', label: 'Color Shift', min: 0, max: 5, step: 0.01, default: 0.5, group: 'Color' },
    { id: 'tintColor', type: 'color', label: 'Tint Color', default: [0.3, 0.1, 0.8, 1.0], group: 'Color' },
    { id: 'tintStrength', type: 'float', label: 'Tint Strength', min: 0, max: 0.5, step: 0.01, default: 0.02, group: 'Color' },
    { id: 'mirror', type: 'bool', label: 'Mirror', default: false, group: 'Transform' },
  ],
  inputs: [{ id: 'input0', label: 'Input', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class FeedbackEcho extends BaseEffect {
  readonly descriptor = DESCRIPTOR;
  private fboA: WebGLFramebuffer | null = null;
  private fboB: WebGLFramebuffer | null = null;
  private texA: WebGLTexture | null = null;
  private texB: WebGLTexture | null = null;
  private pingPong = 0;

  init(gl: WebGL2RenderingContext): void {
    this.gl = gl;
    this.shader = this.createShader(gl, vertSrc, fragSrc);
  }

  resize(width: number, height: number): void {
    super.resize(width, height);
    this.createFBOs();
  }

  private createFBOs(): void {
    const gl = this.gl!;

    // Clean up old FBOs
    if (this.fboA) gl.deleteFramebuffer(this.fboA);
    if (this.fboB) gl.deleteFramebuffer(this.fboB);
    if (this.texA) gl.deleteTexture(this.texA);
    if (this.texB) gl.deleteTexture(this.texB);

    const createFBO = (): { fbo: WebGLFramebuffer; tex: WebGLTexture } => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, this.w, this.h, 0, gl.RGBA, gl.FLOAT, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      return { fbo, tex };
    };

    const a = createFBO();
    const b = createFBO();
    this.fboA = a.fbo;
    this.texA = a.tex;
    this.fboB = b.fbo;
    this.texB = b.tex;
  }

  render(
    ctx: FrameContext,
    params: ParameterValues,
    inputTextures: Map<string, WebGLTexture>,
  ): void {
    const gl = this.gl!;
    if (!this.fboA || !this.fboB) return;

    const s = this.shader!;

    // Read from previous frame (ping), write to the current output FBO (pong)
    // But final output goes to whatever the pipeline bound (screen or intermediate FBO)
    const prevTex = this.pingPong === 0 ? this.texA! : this.texB!;
    const dstFBO = this.pingPong === 0 ? this.fboB! : this.fboA!;
    const dstTex = this.pingPong === 0 ? this.texB! : this.texA!;

    // First, render feedback into our persistent FBO
    gl.bindFramebuffer(gl.FRAMEBUFFER, dstFBO);
    gl.viewport(0, 0, this.w, this.h);

    s.use();
    s.setVec2('u_resolution', this.w, this.h);
    s.setFloat('u_time', ctx.time);
    s.setFloat('u_decay', params.decay as number);
    s.setFloat('u_zoom', params.zoom as number);
    s.setFloat('u_rotation', params.rotation as number);
    s.setFloat('u_blurAmount', params.blurAmount as number);
    s.setFloat('u_colorShiftSpeed', params.colorShiftSpeed as number);
    s.setFloat('u_tintStrength', params.tintStrength as number);
    s.setFloat('u_mirror', (params.mirror as boolean) ? 1.0 : 0.0);

    const tc = params.tintColor as [number, number, number, number];
    s.setVec4('u_tintColor', tc[0], tc[1], tc[2], tc[3]);

    s.setTexture('u_prevFrame', prevTex, 0);

    const inputTex = inputTextures.get('input0');
    if (inputTex) {
      s.setTexture('u_inputTexture', inputTex, 1);
      s.setInt('u_hasInput', 1);
    } else {
      s.setInt('u_hasInput', 0);
    }

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // Now copy the result to the pipeline's current render target
    // We need to blit from our internal FBO to whatever was bound before
    // Since the pipeline binds the target before calling render(), we need
    // to read from dstFBO and write to the pipeline target
    // The simplest approach: set outputTexture and let the pipeline use it
    this.outputTexture = dstTex;

    this.pingPong = 1 - this.pingPong;
  }

  dispose(): void {
    super.dispose();
    const gl = this.gl;
    if (!gl) return;
    if (this.fboA) gl.deleteFramebuffer(this.fboA);
    if (this.fboB) gl.deleteFramebuffer(this.fboB);
    if (this.texA) gl.deleteTexture(this.texA);
    if (this.texB) gl.deleteTexture(this.texB);
  }
}
