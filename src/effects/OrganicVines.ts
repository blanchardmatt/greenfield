import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'organic-vines',
  name: 'Ornamental Flourish',
  description: 'Endlessly growing decorative scrollwork with color layering',
  parameters: [
    { id: 'growSpeed', type: 'float', label: 'Grow Speed', min: 0.5, max: 8, step: 0.1, default: 3.0, group: 'Growth' },
    { id: 'curliness', type: 'float', label: 'Curl Tightness', min: 0.02, max: 0.15, step: 0.001, default: 0.06, group: 'Shape' },
    { id: 'thickness', type: 'float', label: 'Stroke Weight', min: 1, max: 6, step: 0.1, default: 2.5, group: 'Shape' },
    { id: 'branchChance', type: 'float', label: 'Branch Chance', min: 0, max: 0.08, step: 0.001, default: 0.025, group: 'Shape' },
    { id: 'dotSize', type: 'float', label: 'Dot Size', min: 0, max: 6, step: 0.1, default: 2.5, group: 'Ornaments' },
    { id: 'invertColors', type: 'bool', label: 'White on Black', default: false, group: 'Style' },
    { id: 'mouseInfluence', type: 'float', label: 'Mouse Influence', min: 0, max: 1, step: 0.01, default: 0.3, group: 'Interaction' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

interface Vine {
  x: number;
  y: number;
  angle: number;
  curvature: number;
  curvatureAccel: number;
  thickness: number;
  life: number;
  seed: number;
  stepsSinceLastDot: number;
}

// HSL to RGB
function hsl(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return [r + m, g + m, b + m];
}

export class OrganicVines {
  readonly descriptor = DESCRIPTOR;
  private gl: WebGL2RenderingContext | null = null;
  private canvas2d: OffscreenCanvas | null = null;
  private ctx2d: OffscreenCanvasRenderingContext2D | null = null;
  private texture: WebGLTexture | null = null;
  private outputTexture: WebGLTexture | null = null;
  private w = 0;
  private h = 0;

  // Vine state
  private vines: Vine[] = [];
  private hueRotation = 0;
  private currentColor = '#000000';
  private bgColor = '#ffffff';
  private pixelsCovered = 0;
  private generationCount = 0;
  private lastSpawnTime = 0;

  init(gl: WebGL2RenderingContext): void {
    this.gl = gl;
    this.texture = gl.createTexture()!;
  }

  resize(width: number, height: number): void {
    this.w = width;
    this.h = height;

    // Create 2D canvas for drawing vines
    this.canvas2d = new OffscreenCanvas(width, height);
    this.ctx2d = this.canvas2d.getContext('2d')!;

    // Clear to background
    this.resetCanvas();

    // Seed initial vines from edges
    this.vines = [];
    this.spawnEdgeVines(4);

    // Update GL texture size
    const gl = this.gl!;
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }

  private resetCanvas(): void {
    const ctx = this.ctx2d!;
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, this.w, this.h);
    this.pixelsCovered = 0;
  }

  private spawnEdgeVines(count: number): void {
    for (let i = 0; i < count; i++) {
      const edge = Math.floor(Math.random() * 4);
      let x = 0, y = 0, angle = 0;
      switch (edge) {
        case 0: // bottom
          x = Math.random() * this.w;
          y = this.h;
          angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
          break;
        case 1: // top
          x = Math.random() * this.w;
          y = 0;
          angle = Math.PI / 2 + (Math.random() - 0.5) * 0.8;
          break;
        case 2: // left
          x = 0;
          y = Math.random() * this.h;
          angle = (Math.random() - 0.5) * 0.8;
          break;
        case 3: // right
          x = this.w;
          y = Math.random() * this.h;
          angle = Math.PI + (Math.random() - 0.5) * 0.8;
          break;
      }
      this.vines.push({
        x, y, angle,
        curvature: 0,
        curvatureAccel: (Math.random() > 0.5 ? 1 : -1) * (0.02 + Math.random() * 0.04),
        thickness: 2.5 + Math.random() * 2,
        life: 60 + Math.random() * 100,
        seed: Math.random() * 1000,
        stepsSinceLastDot: 0,
      });
    }
  }

  private updateColors(invert: boolean): void {
    if (invert) {
      this.bgColor = '#000000';
    } else {
      this.bgColor = '#ffffff';
    }

    if (this.generationCount === 0) {
      this.currentColor = invert ? '#ffffff' : '#000000';
    } else {
      const [r, g, b] = hsl(this.hueRotation % 360, 0.7, invert ? 0.65 : 0.35);
      this.currentColor = `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
    }
  }

  render(
    ctx: FrameContext,
    params: ParameterValues,
    _inputTextures: Map<string, WebGLTexture>,
  ): void {
    const gl = this.gl!;
    if (!this.ctx2d || !this.canvas2d) return;

    const c = this.ctx2d;
    const growSpeed = params.growSpeed as number;
    const curliness = params.curliness as number;
    const baseThickness = params.thickness as number;
    const branchChance = params.branchChance as number;
    const dotSize = params.dotSize as number;
    const invert = params.invertColors as boolean;
    const mouseInf = params.mouseInfluence as number;

    this.updateColors(invert);

    // Steps per frame based on grow speed
    const steps = Math.floor(growSpeed);

    for (let s = 0; s < steps; s++) {
      // Grow each vine
      const newVines: Vine[] = [];

      for (let vi = this.vines.length - 1; vi >= 0; vi--) {
        const v = this.vines[vi]!;
        if (v.life <= 0) {
          this.vines.splice(vi, 1);
          continue;
        }

        // Curvature acceleration → spiral at tips
        v.curvature += v.curvatureAccel * curliness;
        // Slight random wander
        v.curvature += (Math.sin(v.seed + v.life * 0.1) * 0.005);
        v.angle += v.curvature;

        // Mouse influence
        const mx = ctx.input.mouse.x * this.w;
        const my = (1 - ctx.input.mouse.y) * this.h;
        const dmx = mx - v.x;
        const dmy = my - v.y;
        const mDist = Math.sqrt(dmx * dmx + dmy * dmy);
        if (mDist > 1 && mouseInf > 0) {
          const pull = mouseInf * 0.15 * Math.exp(-mDist / (this.w * 0.15));
          const targetAngle = Math.atan2(dmy, dmx);
          let diff = targetAngle - v.angle;
          diff = ((diff + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
          v.angle += diff * pull;
        }

        const segLen = 4 + v.thickness * 0.5;
        const nx = v.x + Math.cos(v.angle) * segLen;
        const ny = v.y + Math.sin(v.angle) * segLen;

        // Draw segment
        const taperedThick = v.thickness * baseThickness * (v.life / (v.life + 30));
        c.strokeStyle = this.currentColor;
        c.lineWidth = Math.max(taperedThick, 0.5);
        c.lineCap = 'round';
        c.beginPath();
        c.moveTo(v.x, v.y);
        c.lineTo(nx, ny);
        c.stroke();

        // Decorative dots
        v.stepsSinceLastDot++;
        if (dotSize > 0 && v.stepsSinceLastDot > 8 && v.life > 20) {
          v.stepsSinceLastDot = 0;
          const dotAngle = v.angle + Math.sign(v.curvature) * Math.PI / 2;
          const dotDist = taperedThick * 2.5 + dotSize;
          const dx = v.x + Math.cos(dotAngle) * dotDist;
          const dy = v.y + Math.sin(dotAngle) * dotDist;
          c.fillStyle = this.currentColor;
          c.beginPath();
          c.arc(dx, dy, dotSize * 0.6, 0, Math.PI * 2);
          c.fill();

          // Trailing smaller dots
          if (Math.random() < 0.4) {
            for (let j = 1; j <= 2; j++) {
              const tdx = dx + Math.cos(dotAngle) * j * dotSize * 1.8;
              const tdy = dy + Math.sin(dotAngle) * j * dotSize * 1.8;
              c.beginPath();
              c.arc(tdx, tdy, dotSize * (0.4 - j * 0.1), 0, Math.PI * 2);
              c.fill();
            }
          }
        }

        // Branch
        if (Math.random() < branchChance && v.life > 30 && v.thickness > 1) {
          const branchDir = Math.random() > 0.5 ? 1 : -1;
          newVines.push({
            x: v.x,
            y: v.y,
            angle: v.angle + branchDir * (0.5 + Math.random() * 1.0),
            curvature: 0,
            curvatureAccel: -v.curvatureAccel * (0.5 + Math.random() * 0.5),
            thickness: v.thickness * (0.4 + Math.random() * 0.3),
            life: v.life * (0.3 + Math.random() * 0.3),
            seed: Math.random() * 1000,
            stepsSinceLastDot: 0,
          });
        }

        v.x = nx;
        v.y = ny;
        v.life -= 1;
        v.thickness *= 0.997;
        this.pixelsCovered += segLen * taperedThick;
      }

      this.vines.push(...newVines);
    }

    // Spawn new vines periodically to keep growth going
    if (this.vines.length < 3 || ctx.time - this.lastSpawnTime > 4) {
      this.lastSpawnTime = ctx.time;
      this.spawnEdgeVines(2);
    }

    // When screen is mostly covered → new color generation
    const coverageRatio = this.pixelsCovered / (this.w * this.h);
    if (coverageRatio > 0.15 && this.vines.length < 5) {
      this.generationCount++;
      this.hueRotation += 60 + Math.random() * 60;
      this.updateColors(invert);
      this.pixelsCovered = 0;
      this.spawnEdgeVines(4);
    }

    // Upload canvas to GL texture
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas2d);

    // Draw fullscreen quad with texture
    // Simple blit — set up minimal shader-free approach using the pipeline's FBO
    gl.viewport(0, 0, this.w, this.h);
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);

    // Use framebuffer blit via copyTexSubImage or just draw manually
    // Since we don't have a blit shader, use the simplest approach:
    // Write pixel data directly
    // Actually we need a simple passthrough shader — let's just draw the texture

    // We'll use a minimal embedded shader for this
    if (!this.blitProgram) this.initBlit(gl);
    gl.useProgram(this.blitProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(this.blitTexLoc, 0);
    gl.bindVertexArray(this.blitVAO);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindVertexArray(null);
  }

  // Minimal blit shader
  private blitProgram: WebGLProgram | null = null;
  private blitTexLoc: WebGLUniformLocation | null = null;
  private blitVAO: WebGLVertexArrayObject | null = null;

  private initBlit(gl: WebGL2RenderingContext): void {
    const vs = `#version 300 es
    const vec2 pos[6] = vec2[](vec2(-1,-1),vec2(1,-1),vec2(-1,1),vec2(-1,1),vec2(1,-1),vec2(1,1));
    out vec2 vUv;
    void main() { gl_Position = vec4(pos[gl_VertexID], 0, 1); vUv = pos[gl_VertexID] * 0.5 + 0.5; }`;
    const fs = `#version 300 es
    precision mediump float;
    uniform sampler2D uTex;
    in vec2 vUv;
    out vec4 fragColor;
    void main() { fragColor = texture(uTex, vUv); }`;

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
    this.blitVAO = gl.createVertexArray()!;
  }

  dispose(): void {
    const gl = this.gl;
    if (!gl) return;
    if (this.texture) gl.deleteTexture(this.texture);
    if (this.blitProgram) gl.deleteProgram(this.blitProgram);
    if (this.blitVAO) gl.deleteVertexArray(this.blitVAO);
    this.canvas2d = null;
    this.ctx2d = null;
  }

  getOutputTexture(_portId?: string): WebGLTexture | null {
    return this.outputTexture;
  }
}
