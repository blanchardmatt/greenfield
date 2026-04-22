import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { ShaderProgram } from '../core/ShaderProgram';
import renderVertSrc from '../shaders/particle/particle-render.vert?raw';
import renderFragSrc from '../shaders/particle/particle-render.frag?raw';

const IS_MOBILE = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
const BOID_COUNT = IS_MOBILE ? 800 : 2500;

// Per-boid: px, py, vx, vy
const PX = 0, PY = 1, VX = 2, VY = 3;
const STRIDE = 4;
const RENDER_STRIDE = 4; // pos.xy, life, size

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'murmuration',
  name: 'Murmuration',
  description: 'Starling-like flocking simulation with alignment, cohesion, and separation',
  parameters: [
    { id: 'speed', type: 'float', label: 'Speed', min: 0.5, max: 8, step: 0.1, default: 3.0, group: 'Motion' },
    { id: 'alignment', type: 'float', label: 'Alignment', min: 0, max: 2, step: 0.01, default: 1.0, group: 'Flocking' },
    { id: 'cohesion', type: 'float', label: 'Cohesion', min: 0, max: 2, step: 0.01, default: 0.8, group: 'Flocking' },
    { id: 'separation', type: 'float', label: 'Separation', min: 0, max: 3, step: 0.01, default: 1.2, group: 'Flocking' },
    { id: 'neighborDist', type: 'float', label: 'Neighbor Radius', min: 20, max: 200, step: 1, default: 80, group: 'Flocking' },
    { id: 'maxForce', type: 'float', label: 'Steer Force', min: 0.01, max: 1, step: 0.01, default: 0.15, group: 'Flocking' },
    { id: 'mouseAttract', type: 'float', label: 'Mouse Attract', min: -3, max: 3, step: 0.01, default: 0.8, group: 'Interaction' },
    { id: 'mouseRadius', type: 'float', label: 'Mouse Radius', min: 50, max: 500, step: 5, default: 200, group: 'Interaction' },
    { id: 'pointScale', type: 'float', label: 'Boid Size', min: 0.5, max: 6, step: 0.1, default: 2.0, group: 'Appearance' },
    { id: 'trailLength', type: 'float', label: 'Trail Fade', min: 0, max: 0.98, step: 0.01, default: 0.85, group: 'Appearance' },
    { id: 'colorBirth', type: 'color', label: 'Color', default: [0.85, 0.9, 1.0, 1.0], group: 'Appearance' },
    { id: 'colorDeath', type: 'color', label: 'Trail Color', default: [0.2, 0.25, 0.4, 0.0], group: 'Appearance' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class Murmuration {
  readonly descriptor = DESCRIPTOR;
  private gl: WebGL2RenderingContext | null = null;
  private renderProgram: ShaderProgram | null = null;
  private vbo: WebGLBuffer | null = null;
  private vao: WebGLVertexArrayObject | null = null;
  private outputTexture: WebGLTexture | null = null;

  private boids: Float32Array | null = null;
  private renderData: Float32Array | null = null;
  private w = 0;
  private h = 0;
  // Trail via persistent FBO
  private trailFBO: WebGLFramebuffer | null = null;
  private trailTex: WebGLTexture | null = null;
  private blitProgram: WebGLProgram | null = null;
  private blitTexLoc: WebGLUniformLocation | null = null;
  private blitFadeLoc: WebGLUniformLocation | null = null;
  private blitVAO: WebGLVertexArrayObject | null = null;

  init(gl: WebGL2RenderingContext): void {
    this.gl = gl;
    this.renderProgram = new ShaderProgram(gl, renderVertSrc, renderFragSrc);

    this.boids = new Float32Array(BOID_COUNT * STRIDE);
    this.renderData = new Float32Array(BOID_COUNT * RENDER_STRIDE);

    for (let i = 0; i < BOID_COUNT; i++) {
      const o = i * STRIDE;
      this.boids[o + PX] = Math.random();
      this.boids[o + PY] = Math.random();
      const angle = Math.random() * Math.PI * 2;
      this.boids[o + VX] = Math.cos(angle) * 0.002;
      this.boids[o + VY] = Math.sin(angle) * 0.002;
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
  }

  resize(width: number, height: number): void {
    this.w = width;
    this.h = height;
    const gl = this.gl!;
    // Trail FBO
    if (this.trailFBO) gl.deleteFramebuffer(this.trailFBO);
    if (this.trailTex) gl.deleteTexture(this.trailTex);
    this.trailTex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, this.trailTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    this.trailFBO = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.trailFBO);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.trailTex, 0);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  private simulate(_dt: number, params: ParameterValues, mouseX: number, mouseY: number): void {
    const b = this.boids!;
    const speed = (params.speed as number) * 0.001;
    const alignW = params.alignment as number;
    const cohW = params.cohesion as number;
    const sepW = params.separation as number;
    const nDist = (params.neighborDist as number) / Math.max(this.w, this.h);
    const nDist2 = nDist * nDist;
    const maxF = params.maxForce as number;
    const mAttract = params.mouseAttract as number;
    const mRadius = (params.mouseRadius as number) / Math.max(this.w, this.h);

    // Use a spatial grid for O(N) neighbor lookups instead of O(N²)
    const cellSize = nDist;
    const gridW = Math.ceil(1 / cellSize) + 1;
    const grid = new Map<number, number[]>();

    for (let i = 0; i < BOID_COUNT; i++) {
      const o = i * STRIDE;
      const gx = Math.floor(b[o + PX]! / cellSize);
      const gy = Math.floor(b[o + PY]! / cellSize);
      const key = gy * gridW + gx;
      let cell = grid.get(key);
      if (!cell) { cell = []; grid.set(key, cell); }
      cell.push(i);
    }

    for (let i = 0; i < BOID_COUNT; i++) {
      const o = i * STRIDE;
      const px = b[o + PX]!;
      const py = b[o + PY]!;
      const vx = b[o + VX]!;
      const vy = b[o + VY]!;

      // Neighbor search (local grid cells only)
      let avgVx = 0, avgVy = 0; // alignment
      let avgPx = 0, avgPy = 0; // cohesion
      let sepX = 0, sepY = 0;   // separation
      let count = 0;

      const gx = Math.floor(px / cellSize);
      const gy = Math.floor(py / cellSize);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const cell = grid.get((gy + dy) * gridW + (gx + dx));
          if (!cell) continue;
          for (const j of cell) {
            if (j === i) continue;
            const jo = j * STRIDE;
            const ddx = b[jo + PX]! - px;
            const ddy = b[jo + PY]! - py;
            const d2 = ddx * ddx + ddy * ddy;
            if (d2 > nDist2 || d2 < 1e-10) continue;
            avgVx += b[jo + VX]!;
            avgVy += b[jo + VY]!;
            avgPx += b[jo + PX]!;
            avgPy += b[jo + PY]!;
            const d = Math.sqrt(d2);
            sepX -= ddx / d;
            sepY -= ddy / d;
            count++;
          }
        }
      }

      let steerX = 0, steerY = 0;

      if (count > 0) {
        // Alignment
        avgVx /= count; avgVy /= count;
        steerX += (avgVx - vx) * alignW;
        steerY += (avgVy - vy) * alignW;
        // Cohesion
        avgPx /= count; avgPy /= count;
        steerX += (avgPx - px) * cohW * 0.01;
        steerY += (avgPy - py) * cohW * 0.01;
        // Separation
        steerX += sepX * sepW * 0.0005;
        steerY += sepY * sepW * 0.0005;
      }

      // Mouse attraction/repulsion
      const dmx = mouseX - px;
      const dmy = mouseY - py;
      const mDist = Math.sqrt(dmx * dmx + dmy * dmy);
      if (mDist < mRadius && mDist > 0.001) {
        const force = mAttract * (1 - mDist / mRadius) * 0.003;
        steerX += (dmx / mDist) * force;
        steerY += (dmy / mDist) * force;
      }

      // Clamp steering
      const sMag = Math.sqrt(steerX * steerX + steerY * steerY);
      if (sMag > maxF * 0.001) {
        steerX = (steerX / sMag) * maxF * 0.001;
        steerY = (steerY / sMag) * maxF * 0.001;
      }

      let nvx = vx + steerX;
      let nvy = vy + steerY;

      // Clamp speed
      const spd = Math.sqrt(nvx * nvx + nvy * nvy);
      if (spd > speed) {
        nvx = (nvx / spd) * speed;
        nvy = (nvy / spd) * speed;
      } else if (spd < speed * 0.3) {
        if (spd > 1e-6) {
          nvx = (nvx / spd) * speed * 0.3;
          nvy = (nvy / spd) * speed * 0.3;
        } else {
          const a = Math.random() * Math.PI * 2;
          nvx = Math.cos(a) * speed * 0.3;
          nvy = Math.sin(a) * speed * 0.3;
        }
      }

      let npx = px + nvx;
      let npy = py + nvy;

      // Wrap around
      npx = ((npx % 1) + 1) % 1;
      npy = ((npy % 1) + 1) % 1;

      b[o + PX] = npx;
      b[o + PY] = npy;
      b[o + VX] = nvx;
      b[o + VY] = nvy;
    }

    // Pack render data
    const r = this.renderData!;
    for (let i = 0; i < BOID_COUNT; i++) {
      const o = i * STRIDE;
      const ro = i * RENDER_STRIDE;
      r[ro] = b[o + PX]!;
      r[ro + 1] = b[o + PY]!;
      // "life" encodes speed-based brightness
      const spd = Math.sqrt(b[o + VX]! ** 2 + b[o + VY]! ** 2);
      r[ro + 2] = Math.min(1, spd / (speed * 1.5)) * 0.7 + 0.3;
      r[ro + 3] = 1.5;
    }
  }

  render(
    ctx: FrameContext,
    params: ParameterValues,
    _inputTextures: Map<string, WebGLTexture>,
  ): void {
    const gl = this.gl!;
    if (!this.trailFBO || !this.trailTex) return;

    const mouseX = ctx.input.mouse.x;
    const mouseY = ctx.input.mouse.y;
    const trailFade = params.trailLength as number;

    this.simulate(ctx.deltaTime, params, mouseX, mouseY);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.renderData!);

    // Render to trail FBO: fade previous frame + draw new boids
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.trailFBO);
    gl.viewport(0, 0, this.w, this.h);

    // Fade previous frame
    if (!this.blitProgram) this.initBlit(gl);
    gl.useProgram(this.blitProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.trailTex);
    gl.uniform1i(this.blitTexLoc, 0);
    gl.uniform1f(this.blitFadeLoc, trailFade);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindVertexArray(this.blitVAO);

    // Clear then draw faded previous
    gl.clearColor(0.02, 0.02, 0.04, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    if (trailFade > 0.01) {
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    // Draw boids on top with additive blend
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    const rp = this.renderProgram!;
    rp.use();
    rp.setVec2('u_resolution', this.w, this.h);
    rp.setFloat('u_pointScale', params.pointScale as number);
    const cb = params.colorBirth as [number, number, number, number];
    rp.setVec4('u_colorBirth', cb[0], cb[1], cb[2], cb[3]);
    const cd = params.colorDeath as [number, number, number, number];
    rp.setVec4('u_colorDeath', cd[0], cd[1], cd[2], cd[3]);

    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.POINTS, 0, BOID_COUNT);
    gl.bindVertexArray(null);
    gl.disable(gl.BLEND);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // Blit trail FBO to the pipeline's current target
    gl.viewport(0, 0, this.w, this.h);
    gl.useProgram(this.blitProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.trailTex);
    gl.uniform1i(this.blitTexLoc, 0);
    gl.uniform1f(this.blitFadeLoc, 1.0); // full opacity for final blit
    gl.bindVertexArray(this.blitVAO);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindVertexArray(null);
  }

  private initBlit(gl: WebGL2RenderingContext): void {
    const vs = `#version 300 es
    const vec2 pos[6] = vec2[](vec2(-1,-1),vec2(1,-1),vec2(-1,1),vec2(-1,1),vec2(1,-1),vec2(1,1));
    out vec2 vUv;
    void main() { gl_Position = vec4(pos[gl_VertexID], 0, 1); vUv = pos[gl_VertexID] * 0.5 + 0.5; }`;
    const fs = `#version 300 es
    precision mediump float;
    uniform sampler2D uTex;
    uniform float uFade;
    in vec2 vUv;
    out vec4 fragColor;
    void main() { vec4 c = texture(uTex, vUv); fragColor = vec4(c.rgb, c.a * uFade); }`;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const p = gl.createProgram()!;
    gl.attachShader(p, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    this.blitProgram = p;
    this.blitTexLoc = gl.getUniformLocation(p, 'uTex');
    this.blitFadeLoc = gl.getUniformLocation(p, 'uFade');
    this.blitVAO = gl.createVertexArray()!;
  }

  dispose(): void {
    const gl = this.gl;
    if (!gl) return;
    this.renderProgram?.dispose();
    if (this.vbo) gl.deleteBuffer(this.vbo);
    if (this.vao) gl.deleteVertexArray(this.vao);
    if (this.trailFBO) gl.deleteFramebuffer(this.trailFBO);
    if (this.trailTex) gl.deleteTexture(this.trailTex);
    if (this.blitProgram) gl.deleteProgram(this.blitProgram);
    if (this.blitVAO) gl.deleteVertexArray(this.blitVAO);
  }

  getOutputTexture(): WebGLTexture | null {
    return this.outputTexture;
  }
}
