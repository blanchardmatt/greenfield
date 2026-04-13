import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { ShaderProgram } from '../core/ShaderProgram';
import renderVertSrc from '../shaders/particle/particle-render.vert?raw';
import renderFragSrc from '../shaders/particle/particle-render.frag?raw';

const IS_MOBILE = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
const PARTICLE_COUNT = IS_MOBILE ? 15000 : 50000;

// Per-particle layout: posX, posY, velX, velY, life, size
const POS_X = 0, POS_Y = 1, VEL_X = 2, VEL_Y = 3, LIFE = 4, SIZE = 5;
const STRIDE = 6;

// Render buffer layout: posX, posY, life, size (4 floats per particle)
const RENDER_STRIDE = 4;

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'particle-system',
  name: 'Particle System',
  description: 'Particle system with mouse interaction',
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
  private renderProgram: ShaderProgram | null = null;
  private vbo: WebGLBuffer | null = null;
  private vao: WebGLVertexArrayObject | null = null;
  private outputTexture: WebGLTexture | null = null;

  // CPU simulation data
  private particles: Float32Array | null = null;
  // GPU upload buffer (only pos, life, size)
  private renderData: Float32Array | null = null;

  init(gl: WebGL2RenderingContext): void {
    this.gl = gl;
    this.renderProgram = new ShaderProgram(gl, renderVertSrc, renderFragSrc);

    // Initialize particle simulation data
    this.particles = new Float32Array(PARTICLE_COUNT * STRIDE);
    this.renderData = new Float32Array(PARTICLE_COUNT * RENDER_STRIDE);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const o = i * STRIDE;
      this.particles[o + POS_X] = Math.random();
      this.particles[o + POS_Y] = Math.random();
      this.particles[o + VEL_X] = (Math.random() - 0.5) * 0.2;
      this.particles[o + VEL_Y] = (Math.random() - 0.5) * 0.2;
      this.particles[o + LIFE] = Math.random();
      this.particles[o + SIZE] = 1.0 + Math.random() * 3.0;
    }

    // Create GPU buffer for render data
    this.vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, this.renderData.byteLength, gl.DYNAMIC_DRAW);

    // Create VAO
    this.vao = gl.createVertexArray()!;
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);

    const rStride = RENDER_STRIDE * 4;
    // location 0: a_position (vec2)
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, rStride, 0);
    // location 1: a_life (float)
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 1, gl.FLOAT, false, rStride, 8);
    // location 2: a_size (float)
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 1, gl.FLOAT, false, rStride, 12);

    gl.bindVertexArray(null);
  }

  private simulate(dt: number, mouseX: number, mouseY: number, params: ParameterValues): void {
    const p = this.particles!;
    const speed = params.speed as number;
    const mouseAttract = params.mouseAttract as number;
    const turbulence = params.turbulence as number;
    const damping = params.damping as number;
    const lifeDecay = params.lifeDecay as number;

    const scaledDt = dt * speed;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const o = i * STRIDE;

      let px = p[o + POS_X]!;
      let py = p[o + POS_Y]!;
      let vx = p[o + VEL_X]!;
      let vy = p[o + VEL_Y]!;
      let life = p[o + LIFE]!;

      // Mouse attraction
      const dx = mouseX - px;
      const dy = mouseY - py;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
      const attractForce = mouseAttract * scaledDt / (dist * 5.0 + 0.1);
      vx += (dx / dist) * attractForce;
      vy += (dy / dist) * attractForce;

      // Turbulence (pseudo-random based on position)
      const angle = Math.sin(px * 12.9898 + py * 78.233 + i * 0.01) * 43758.5453 % 6.28318;
      vx += Math.cos(angle) * turbulence * scaledDt;
      vy += Math.sin(angle) * turbulence * scaledDt;

      // Damping
      const dampFactor = 1.0 - damping * scaledDt;
      vx *= dampFactor;
      vy *= dampFactor;

      // Integrate
      px += vx * scaledDt;
      py += vy * scaledDt;

      // Life decay
      life -= lifeDecay * scaledDt;

      // Respawn dead particles near mouse
      if (life <= 0) {
        px = mouseX + (Math.random() - 0.5) * 0.05;
        py = mouseY + (Math.random() - 0.5) * 0.05;
        vx = (Math.random() - 0.5) * 0.3;
        vy = (Math.random() - 0.5) * 0.3;
        life = 0.5 + Math.random() * 0.5;
        p[o + SIZE] = 1.0 + Math.random() * 3.0;
      }

      // Wrap around
      px = ((px % 1.0) + 1.0) % 1.0;
      py = ((py % 1.0) + 1.0) % 1.0;

      p[o + POS_X] = px;
      p[o + POS_Y] = py;
      p[o + VEL_X] = vx;
      p[o + VEL_Y] = vy;
      p[o + LIFE] = life;
    }

    // Pack render data (position, life, size only)
    const r = this.renderData!;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const so = i * STRIDE;
      const ro = i * RENDER_STRIDE;
      r[ro] = p[so + POS_X]!;
      r[ro + 1] = p[so + POS_Y]!;
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

    // CPU simulation
    this.simulate(
      ctx.deltaTime,
      ctx.input.mouse.x,
      ctx.input.mouse.y,
      params,
    );

    // Upload render data to GPU
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.renderData!);

    // Clear
    gl.clearColor(0.02, 0.02, 0.04, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Render particles
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

    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);
    gl.bindVertexArray(null);

    gl.disable(gl.BLEND);
  }

  resize(_width: number, _height: number): void {
    // Particles work in normalized coords, no resize needed
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

  getOutputTexture(_portId?: string): WebGLTexture | null {
    return this.outputTexture;
  }
}
