import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { ShaderProgram } from '../core/ShaderProgram';
import updateVertSrc from '../shaders/particle/particle-update.vert?raw';
import renderVertSrc from '../shaders/particle/particle-render.vert?raw';
import renderFragSrc from '../shaders/particle/particle-render.frag?raw';

// Minimal passthrough fragment shader for transform feedback
const TF_FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;
void main() { fragColor = vec4(0.0); }
`;

const PARTICLE_COUNT = 50000;
const FLOATS_PER_PARTICLE = 6; // posX, posY, velX, velY, life, size

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'particle-system',
  name: 'Particle System',
  description: 'GPU-driven particle system with mouse interaction',
  parameters: [
    { id: 'speed', type: 'float', label: 'Speed', min: 0.1, max: 5, step: 0.01, default: 1.0, group: 'Motion' },
    { id: 'mouseAttract', type: 'float', label: 'Mouse Attract', min: -2, max: 2, step: 0.01, default: 0.5, group: 'Interaction' },
    { id: 'turbulence', type: 'float', label: 'Turbulence', min: 0, max: 3, step: 0.01, default: 0.5, group: 'Motion' },
    { id: 'damping', type: 'float', label: 'Damping', min: 0, max: 5, step: 0.01, default: 1.0, group: 'Motion' },
    { id: 'lifeDecay', type: 'float', label: 'Life Decay', min: 0.05, max: 3, step: 0.01, default: 0.4, group: 'Lifecycle' },
    { id: 'pointScale', type: 'float', label: 'Point Scale', min: 0.5, max: 10, step: 0.1, default: 3.0, group: 'Appearance' },
    { id: 'colorBirth', type: 'color', label: 'Birth Color', default: [1.0, 0.8, 0.3, 1.0], group: 'Color' },
    { id: 'colorDeath', type: 'color', label: 'Death Color', default: [0.2, 0.05, 0.5, 0.0], group: 'Color' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class ParticleSystem {
  readonly descriptor = DESCRIPTOR;
  private gl: WebGL2RenderingContext | null = null;
  private updateProgram: ShaderProgramWrapper | null = null;
  private renderProgram: ShaderProgram | null = null;
  private vboA: WebGLBuffer | null = null;
  private vboB: WebGLBuffer | null = null;
  private vaoUpdate: WebGLVertexArrayObject | null = null;
  private vaoRender: WebGLVertexArrayObject | null = null;
  private transformFeedback: WebGLTransformFeedback | null = null;
  private pingPong = 0;
  private outputTexture: WebGLTexture | null = null;

  init(gl: WebGL2RenderingContext): void {
    this.gl = gl;

    // Create update program with transform feedback
    const updateProg = gl.createProgram()!;
    const vs = this.compileShader(gl, gl.VERTEX_SHADER, updateVertSrc);
    const fs = this.compileShader(gl, gl.FRAGMENT_SHADER, TF_FRAG);
    gl.attachShader(updateProg, vs);
    gl.attachShader(updateProg, fs);
    gl.transformFeedbackVaryings(
      updateProg,
      ['v_position', 'v_velocity', 'v_life', 'v_size'],
      gl.INTERLEAVED_ATTRIBS,
    );
    gl.linkProgram(updateProg);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(updateProg, gl.LINK_STATUS)) {
      throw new Error(`TF program link failed: ${gl.getProgramInfoLog(updateProg)}`);
    }
    this.updateProgram = new ShaderProgramWrapper(gl, updateProg);

    // Create render program
    this.renderProgram = new ShaderProgram(gl, renderVertSrc, renderFragSrc);

    // Initialize particle data
    const data = new Float32Array(PARTICLE_COUNT * FLOATS_PER_PARTICLE);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const offset = i * FLOATS_PER_PARTICLE;
      data[offset] = Math.random();     // posX
      data[offset + 1] = Math.random(); // posY
      data[offset + 2] = (Math.random() - 0.5) * 0.2; // velX
      data[offset + 3] = (Math.random() - 0.5) * 0.2; // velY
      data[offset + 4] = Math.random(); // life
      data[offset + 5] = 1.0 + Math.random() * 3.0; // size
    }

    this.vboA = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vboA);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_COPY);

    this.vboB = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vboB);
    gl.bufferData(gl.ARRAY_BUFFER, data.byteLength, gl.DYNAMIC_COPY);

    // VAO for update pass (reads from current VBO)
    this.vaoUpdate = gl.createVertexArray()!;
    // VAO for render pass
    this.vaoRender = gl.createVertexArray()!;

    this.transformFeedback = gl.createTransformFeedback()!;

    this.setupVAOs();
  }

  private compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Shader compile failed: ${info}`);
    }
    return shader;
  }

  private setupVAOs(): void {
    const gl = this.gl!;
    const stride = FLOATS_PER_PARTICLE * 4;
    const srcVBO = this.pingPong === 0 ? this.vboA! : this.vboB!;
    const dstVBO = this.pingPong === 0 ? this.vboB! : this.vboA!;

    // Update VAO — reads from src
    gl.bindVertexArray(this.vaoUpdate);
    gl.bindBuffer(gl.ARRAY_BUFFER, srcVBO);
    // a_position
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, stride, 0);
    // a_velocity
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, stride, 8);
    // a_life
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 1, gl.FLOAT, false, stride, 16);
    // a_size
    gl.enableVertexAttribArray(3);
    gl.vertexAttribPointer(3, 1, gl.FLOAT, false, stride, 20);

    // Render VAO — reads from dst (which just got written)
    gl.bindVertexArray(this.vaoRender);
    gl.bindBuffer(gl.ARRAY_BUFFER, dstVBO);
    // a_position
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, stride, 0);
    // a_life (at offset 16)
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 1, gl.FLOAT, false, stride, 16);
    // a_size (at offset 20)
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 1, gl.FLOAT, false, stride, 20);

    gl.bindVertexArray(null);
  }

  render(
    ctx: FrameContext,
    params: ParameterValues,
    inputTextures: Map<string, WebGLTexture>,
  ): void {
    const gl = this.gl!;

    this.setupVAOs();
    const dstVBO = this.pingPong === 0 ? this.vboB! : this.vboA!;

    // --- Update pass (transform feedback) ---
    const up = this.updateProgram!;
    up.use();
    up.setFloat('u_deltaTime', ctx.deltaTime);
    up.setVec2('u_mouse', ctx.input.mouse.x, ctx.input.mouse.y);
    up.setFloat('u_mouseAttract', params.mouseAttract as number);
    up.setFloat('u_speed', params.speed as number);
    up.setFloat('u_turbulence', params.turbulence as number);
    up.setFloat('u_time', ctx.time);
    up.setFloat('u_damping', params.damping as number);
    up.setFloat('u_lifeDecay', params.lifeDecay as number);

    gl.bindVertexArray(this.vaoUpdate);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.transformFeedback);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, dstVBO);

    gl.enable(gl.RASTERIZER_DISCARD);
    gl.beginTransformFeedback(gl.POINTS);
    gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);
    gl.endTransformFeedback();
    gl.disable(gl.RASTERIZER_DISCARD);

    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null);

    // --- Render pass ---
    // Clear with input texture or black
    const inputTex = inputTextures.get('input0');
    if (inputTex) {
      // TODO: draw input texture as background
    } else {
      gl.clearColor(0.02, 0.02, 0.04, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // Additive blending

    const rp = this.renderProgram!;
    rp.use();
    rp.setVec2('u_resolution', ctx.resolution[0], ctx.resolution[1]);
    rp.setFloat('u_pointScale', params.pointScale as number);

    const cb = params.colorBirth as [number, number, number, number];
    rp.setVec4('u_colorBirth', cb[0], cb[1], cb[2], cb[3]);
    const cd = params.colorDeath as [number, number, number, number];
    rp.setVec4('u_colorDeath', cd[0], cd[1], cd[2], cd[3]);

    gl.bindVertexArray(this.vaoRender);
    gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);
    gl.bindVertexArray(null);

    gl.disable(gl.BLEND);

    // Swap buffers
    this.pingPong = 1 - this.pingPong;
  }

  resize(_width: number, _height: number): void {
    // Particles work in normalized coords, no resize needed
  }

  dispose(): void {
    const gl = this.gl;
    if (!gl) return;
    this.updateProgram?.dispose();
    this.renderProgram?.dispose();
    if (this.vboA) gl.deleteBuffer(this.vboA);
    if (this.vboB) gl.deleteBuffer(this.vboB);
    if (this.vaoUpdate) gl.deleteVertexArray(this.vaoUpdate);
    if (this.vaoRender) gl.deleteVertexArray(this.vaoRender);
    if (this.transformFeedback) gl.deleteTransformFeedback(this.transformFeedback);
  }

  getOutputTexture(_portId?: string): WebGLTexture | null {
    return this.outputTexture;
  }
}

/**
 * Thin wrapper to give a raw WebGLProgram the same uniform-setting API
 * as ShaderProgram, without recompiling.
 */
class ShaderProgramWrapper {
  readonly program: WebGLProgram;
  private readonly gl: WebGL2RenderingContext;
  private readonly cache = new Map<string, WebGLUniformLocation | null>();

  constructor(gl: WebGL2RenderingContext, program: WebGLProgram) {
    this.gl = gl;
    this.program = program;
  }

  use(): void {
    this.gl.useProgram(this.program);
  }

  private loc(name: string): WebGLUniformLocation | null {
    let l = this.cache.get(name);
    if (l === undefined) {
      l = this.gl.getUniformLocation(this.program, name);
      this.cache.set(name, l);
    }
    return l;
  }

  setFloat(name: string, v: number): void {
    const l = this.loc(name);
    if (l) this.gl.uniform1f(l, v);
  }

  setVec2(name: string, x: number, y: number): void {
    const l = this.loc(name);
    if (l) this.gl.uniform2f(l, x, y);
  }

  dispose(): void {
    this.gl.deleteProgram(this.program);
  }
}
