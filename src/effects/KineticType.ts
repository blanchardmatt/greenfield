import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { ShaderProgram } from '../core/ShaderProgram';
import renderVertSrc from '../shaders/particle/particle-render.vert?raw';
import renderFragSrc from '../shaders/particle/particle-render.frag?raw';

const PARTICLE_COUNT = 12000;
// Layout: posX, posY, velX, velY, targetX, targetY, life, size
const POS_X = 0, POS_Y = 1, VEL_X = 2, VEL_Y = 3, TGT_X = 4, TGT_Y = 5, LIFE = 6, SIZE = 7;
const STRIDE = 8;
const RENDER_STRIDE = 4;

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'kinetic-type',
  name: 'Kinetic Type',
  description: 'Text rendered as a swarm of particles that scatter and reassemble',
  parameters: [
    { id: 'text', type: 'string', label: 'Text', default: 'HELLO', placeholder: 'Type here…', group: 'Content' },
    { id: 'fontFamily', type: 'enum', label: 'Font', options: [
      { value: 'system-ui, sans-serif', label: 'Sans' },
      { value: 'Georgia, serif', label: 'Serif' },
      { value: '"Courier New", monospace', label: 'Mono' },
      { value: 'Impact, sans-serif', label: 'Display' },
    ], default: 'Impact, sans-serif', group: 'Content' },
    { id: 'fontSize', type: 'float', label: 'Font Size', min: 40, max: 400, step: 1, default: 180, group: 'Content' },
    { id: 'mode', type: 'enum', label: 'Behavior', options: [
      { value: 'assemble', label: 'Always Assembled' },
      { value: 'breathe', label: 'Breathe' },
      { value: 'explode', label: 'Explode & Reform' },
      { value: 'mouse', label: 'Mouse Disturbs' },
    ], default: 'breathe', group: 'Behavior' },
    { id: 'cohesion', type: 'float', label: 'Cohesion', min: 0.5, max: 20, step: 0.1, default: 6, group: 'Behavior' },
    { id: 'damping', type: 'float', label: 'Damping', min: 0.5, max: 10, step: 0.1, default: 4, group: 'Behavior' },
    { id: 'jitter', type: 'float', label: 'Jitter', min: 0, max: 50, step: 0.5, default: 6, group: 'Behavior' },
    { id: 'cycleSpeed', type: 'float', label: 'Cycle Speed', min: 0, max: 3, step: 0.01, default: 0.5, group: 'Behavior' },
    { id: 'pointScale', type: 'float', label: 'Point Size', min: 0.5, max: 8, step: 0.1, default: 2.0, group: 'Appearance' },
    { id: 'colorBirth', type: 'color', label: 'Color', default: [0.6, 0.9, 1.0, 1.0], group: 'Appearance' },
    { id: 'colorDeath', type: 'color', label: 'Trail Color', default: [0.2, 0.0, 0.5, 0.0], group: 'Appearance' },
    { id: 'mouseInfluence', type: 'float', label: 'Mouse Force', min: 0, max: 200, step: 1, default: 80, group: 'Behavior' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class KineticType {
  readonly descriptor = DESCRIPTOR;
  private gl: WebGL2RenderingContext | null = null;
  private renderProgram: ShaderProgram | null = null;
  private vbo: WebGLBuffer | null = null;
  private vao: WebGLVertexArrayObject | null = null;
  private outputTexture: WebGLTexture | null = null;

  private particles: Float32Array | null = null;
  private renderData: Float32Array | null = null;
  private w = 0;
  private h = 0;

  // Text sampling
  private textCanvas: HTMLCanvasElement | null = null;
  private textCtx: CanvasRenderingContext2D | null = null;
  private lastTextKey = '';
  private targetPoints: Array<{ x: number; y: number }> = [];

  init(gl: WebGL2RenderingContext): void {
    this.gl = gl;
    this.renderProgram = new ShaderProgram(gl, renderVertSrc, renderFragSrc);

    this.particles = new Float32Array(PARTICLE_COUNT * STRIDE);
    this.renderData = new Float32Array(PARTICLE_COUNT * RENDER_STRIDE);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const o = i * STRIDE;
      this.particles[o + POS_X] = Math.random();
      this.particles[o + POS_Y] = Math.random();
      this.particles[o + LIFE] = Math.random();
      this.particles[o + SIZE] = 1.0 + Math.random() * 2.0;
    }

    this.vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, this.renderData.byteLength, gl.DYNAMIC_DRAW);

    this.vao = gl.createVertexArray()!;
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    const rs = RENDER_STRIDE * 4;
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, rs, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 1, gl.FLOAT, false, rs, 8);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 1, gl.FLOAT, false, rs, 12);
    gl.bindVertexArray(null);

    this.textCanvas = document.createElement('canvas');
    this.textCtx = this.textCanvas.getContext('2d', { willReadFrequently: true })!;
  }

  resize(width: number, height: number): void {
    this.w = width;
    this.h = height;
    if (this.textCanvas) {
      this.textCanvas.width = width;
      this.textCanvas.height = height;
    }
    this.lastTextKey = ''; // force resample
  }

  private resampleTextPoints(text: string, fontFamily: string, fontSize: number): void {
    const c = this.textCtx!;
    c.clearRect(0, 0, this.w, this.h);
    c.fillStyle = 'white';
    c.font = `${fontSize}px ${fontFamily}`;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(text, this.w / 2, this.h / 2);

    if (this.w === 0 || this.h === 0) return;
    const data = c.getImageData(0, 0, this.w, this.h).data;

    // Sample white pixels into target points
    const points: Array<{ x: number; y: number }> = [];
    const step = 3; // sub-sample for perf
    for (let y = 0; y < this.h; y += step) {
      for (let x = 0; x < this.w; x += step) {
        const idx = (y * this.w + x) * 4;
        if (data[idx]! > 128) {
          points.push({ x, y });
        }
      }
    }
    this.targetPoints = points;

    // Re-assign target for each particle from points (uniformly cycle)
    if (points.length > 0) {
      const p = this.particles!;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const o = i * STRIDE;
        const tp = points[i % points.length]!;
        p[o + TGT_X] = tp.x;
        p[o + TGT_Y] = tp.y;
        // Initial position scattered if not yet placed
        if (i % points.length === 0 && Math.random() < 0.05) {
          // ok
        }
      }
    }
  }

  private simulate(
    dt: number,
    mode: string,
    cohesion: number,
    damping: number,
    jitter: number,
    cycleSpeed: number,
    mouseInfluence: number,
    mouseX: number,
    mouseY: number,
    mouseDown: boolean,
    time: number,
  ): void {
    const p = this.particles!;
    if (this.targetPoints.length === 0) return;

    // Compute "release" factor — 0=fully assembled, 1=fully scattered
    let release = 0;
    if (mode === 'breathe') {
      release = (Math.sin(time * cycleSpeed) * 0.5 + 0.5) * 0.5; // 0..0.5
    } else if (mode === 'explode') {
      const phase = (time * cycleSpeed * 0.5) % 1;
      release = phase < 0.4 ? 0 : phase < 0.6 ? (phase - 0.4) / 0.2 : Math.max(0, 1 - (phase - 0.6) / 0.4);
    } else if (mode === 'assemble') {
      release = 0;
    }

    const forceScale = cohesion;
    const dampFactor = Math.max(0, 1 - damping * dt);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const o = i * STRIDE;
      let px = p[o + POS_X]!;
      let py = p[o + POS_Y]!;
      let vx = p[o + VEL_X]!;
      let vy = p[o + VEL_Y]!;
      const tx = p[o + TGT_X]!;
      const ty = p[o + TGT_Y]!;

      // Spring force toward target
      const dx = tx - px;
      const dy = ty - py;
      vx += dx * forceScale * dt;
      vy += dy * forceScale * dt;

      // Random jitter (always present)
      vx += (Math.random() - 0.5) * jitter;
      vy += (Math.random() - 0.5) * jitter;

      // Release: push outward from text center
      if (release > 0.01) {
        const cx = this.w / 2;
        const cy = this.h / 2;
        const ox = px - cx;
        const oy = py - cy;
        const odist = Math.hypot(ox, oy) + 1;
        const push = release * 200;
        vx += (ox / odist) * push * dt;
        vy += (oy / odist) * push * dt;
      }

      // Mouse mode: repel from mouse
      if (mode === 'mouse' || mouseDown) {
        const mdx = px - mouseX;
        const mdy = py - mouseY;
        const mdist = Math.hypot(mdx, mdy) + 1;
        const radius = 150;
        if (mdist < radius) {
          const force = (1 - mdist / radius) * mouseInfluence;
          vx += (mdx / mdist) * force;
          vy += (mdy / mdist) * force;
        }
      }

      vx *= dampFactor;
      vy *= dampFactor;

      px += vx * dt;
      py += vy * dt;

      p[o + POS_X] = px;
      p[o + POS_Y] = py;
      p[o + VEL_X] = vx;
      p[o + VEL_Y] = vy;

      // Life pulses for trail color
      p[o + LIFE] = 0.5 + 0.5 * Math.sin(time * 1.5 + i * 0.01);
    }

    // Pack render data
    const r = this.renderData!;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const so = i * STRIDE;
      const ro = i * RENDER_STRIDE;
      // Convert pixel coords → 0-1 normalized
      r[ro] = p[so + POS_X]! / this.w;
      r[ro + 1] = p[so + POS_Y]! / this.h;
      r[ro + 2] = p[so + LIFE]!;
      r[ro + 3] = p[so + SIZE]!;
    }
  }

  render(
    ctx: FrameContext,
    params: ParameterValues,
    _inputTextures: Map<string, WebGLTexture>,
  ): void {
    const gl = this.gl!;
    const text = (params.text as string) || '';
    const fontFamily = params.fontFamily as string;
    const fontSize = params.fontSize as number;
    const key = `${text}|${fontFamily}|${fontSize}|${this.w}|${this.h}`;
    if (key !== this.lastTextKey) {
      this.resampleTextPoints(text, fontFamily, fontSize);
      this.lastTextKey = key;
    }

    const mouseX = ctx.input.mouse.x * this.w;
    const mouseY = (1 - ctx.input.mouse.y) * this.h;

    this.simulate(
      ctx.deltaTime,
      params.mode as string,
      params.cohesion as number,
      params.damping as number,
      params.jitter as number,
      params.cycleSpeed as number,
      params.mouseInfluence as number,
      mouseX,
      mouseY,
      ctx.input.mouse.down,
      ctx.time,
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.renderData!);

    gl.clearColor(0.02, 0.02, 0.04, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const rp = this.renderProgram!;
    rp.use();
    rp.setVec2('u_resolution', ctx.resolution[0], ctx.resolution[1]);
    rp.setFloat('u_pointScale', params.pointScale as number);
    const cb = params.colorBirth as [number, number, number, number];
    rp.setVec4('u_colorBirth', cb[0], cb[1], cb[2], cb[3]);
    const cd = params.colorDeath as [number, number, number, number];
    rp.setVec4('u_colorDeath', cd[0], cd[1], cd[2], cd[3]);

    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);
    gl.bindVertexArray(null);

    gl.disable(gl.BLEND);
  }

  dispose(): void {
    const gl = this.gl;
    if (!gl) return;
    this.renderProgram?.dispose();
    if (this.vbo) gl.deleteBuffer(this.vbo);
    if (this.vao) gl.deleteVertexArray(this.vao);
    this.particles = null;
    this.renderData = null;
  }

  getOutputTexture(): WebGLTexture | null {
    return this.outputTexture;
  }
}
