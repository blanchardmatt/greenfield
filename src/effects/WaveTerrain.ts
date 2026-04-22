import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'wave-terrain',
  name: 'Wave Terrain',
  description: 'Joy Division–style stacked displaced lines, like Unknown Pleasures',
  parameters: [
    { id: 'lineCount', type: 'int', label: 'Line Count', min: 10, max: 120, default: 50, group: 'Shape' },
    { id: 'amplitude', type: 'float', label: 'Amplitude', min: 0, max: 200, step: 1, default: 80, group: 'Shape' },
    { id: 'frequency', type: 'float', label: 'Frequency', min: 0.5, max: 8, step: 0.05, default: 2.5, group: 'Shape' },
    { id: 'noiseOctaves', type: 'int', label: 'Detail', min: 1, max: 6, default: 3, group: 'Shape' },
    { id: 'speed', type: 'float', label: 'Speed', min: 0, max: 3, step: 0.01, default: 0.6, group: 'Animation' },
    { id: 'lineWidth', type: 'float', label: 'Line Width', min: 0.5, max: 5, step: 0.1, default: 1.2, group: 'Appearance' },
    { id: 'lineColor', type: 'color', label: 'Line Color', default: [1.0, 1.0, 1.0, 1.0], group: 'Appearance' },
    { id: 'bgColor', type: 'color', label: 'Background', default: [0.0, 0.0, 0.0, 1.0], group: 'Appearance' },
    { id: 'glow', type: 'float', label: 'Glow', min: 0, max: 20, step: 0.5, default: 0, group: 'Appearance' },
    { id: 'perspective', type: 'float', label: 'Perspective', min: 0, max: 1, step: 0.01, default: 0.3, group: 'Layout' },
    { id: 'centerPeak', type: 'float', label: 'Center Peak', min: 0, max: 3, step: 0.01, default: 1.5, group: 'Shape' },
    { id: 'mouseInfluence', type: 'float', label: 'Mouse Influence', min: 0, max: 1, step: 0.01, default: 0.4, group: 'Interaction' },
    { id: 'fillOcclusion', type: 'bool', label: 'Occlude (filled)', default: true, group: 'Appearance' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

// Simple 2D noise for terrain generation (good enough, no GLSL needed)
function hash(x: number, y: number): number {
  let n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x: number, y: number, octaves: number): number {
  let v = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < octaves; i++) {
    v += amp * (smoothNoise(x * freq, y * freq) * 2 - 1);
    freq *= 2.1;
    amp *= 0.5;
  }
  return v;
}

export class WaveTerrain {
  readonly descriptor = DESCRIPTOR;
  private gl: WebGL2RenderingContext | null = null;
  private texture: WebGLTexture | null = null;
  private outputTexture: WebGLTexture | null = null;
  private canvas2d: HTMLCanvasElement | null = null;
  private ctx2d: CanvasRenderingContext2D | null = null;
  private w = 0;
  private h = 0;

  // Blit
  private blitProgram: WebGLProgram | null = null;
  private blitTexLoc: WebGLUniformLocation | null = null;
  private blitVAO: WebGLVertexArrayObject | null = null;

  init(gl: WebGL2RenderingContext): void {
    this.gl = gl;
    this.texture = gl.createTexture()!;
  }

  resize(width: number, height: number): void {
    this.w = width;
    this.h = height;
    if (!this.canvas2d) {
      this.canvas2d = document.createElement('canvas');
      this.ctx2d = this.canvas2d.getContext('2d')!;
    }
    this.canvas2d.width = width;
    this.canvas2d.height = height;
    const gl = this.gl!;
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }

  render(
    _ctx: FrameContext,
    params: ParameterValues,
    _inputTextures: Map<string, WebGLTexture>,
  ): void {
    const gl = this.gl!;
    const c = this.ctx2d;
    if (!c || !this.canvas2d) return;

    const lineCount = params.lineCount as number;
    const amplitude = params.amplitude as number;
    const frequency = params.frequency as number;
    const octaves = params.noiseOctaves as number;
    const speed = params.speed as number;
    const lineWidth = params.lineWidth as number;
    const lineColor = params.lineColor as [number, number, number, number];
    const bgColor = params.bgColor as [number, number, number, number];
    const glow = params.glow as number;
    const perspective = params.perspective as number;
    const centerPeak = params.centerPeak as number;
    const mouseInf = params.mouseInfluence as number;
    const fillOcclusion = params.fillOcclusion as boolean;

    const t = _ctx.time * speed;
    const mx = _ctx.input.mouse.x;
    const my = _ctx.input.mouse.y;

    const cw = this.w;
    const ch = this.h;

    // Background
    const bgR = Math.round(bgColor[0] * 255);
    const bgG = Math.round(bgColor[1] * 255);
    const bgB = Math.round(bgColor[2] * 255);
    c.fillStyle = `rgb(${bgR},${bgG},${bgB})`;
    c.fillRect(0, 0, cw, ch);

    const lcR = Math.round(lineColor[0] * 255);
    const lcG = Math.round(lineColor[1] * 255);
    const lcB = Math.round(lineColor[2] * 255);
    const strokeCss = `rgb(${lcR},${lcG},${lcB})`;
    const fillCss = `rgb(${bgR},${bgG},${bgB})`;

    c.lineCap = 'round';
    c.lineJoin = 'round';
    c.lineWidth = lineWidth;

    if (glow > 0) {
      c.shadowColor = strokeCss;
      c.shadowBlur = glow;
    }

    const marginX = cw * 0.08;
    const marginTop = ch * 0.12;
    const marginBot = ch * 0.08;
    const drawW = cw - marginX * 2;
    const drawH = ch - marginTop - marginBot;
    const lineSpacing = drawH / Math.max(1, lineCount - 1);
    const xSteps = Math.floor(drawW / 3); // sample every ~3px

    // Draw lines FRONT to BACK (bottom to top). Occlusion via filled region.
    for (let li = lineCount - 1; li >= 0; li--) {
      const lineRatio = li / Math.max(1, lineCount - 1); // 0=top line, 1=bottom
      const baseY = marginTop + li * lineSpacing;

      // Perspective: scale amplitude with distance (top lines = farther = smaller)
      const perspScale = 1 - perspective * (1 - lineRatio);

      // Center peak: amplify displacement near horizontal center
      const samplesX: number[] = [];
      const samplesY: number[] = [];

      for (let xi = 0; xi <= xSteps; xi++) {
        const xRatio = xi / xSteps;
        const x = marginX + xRatio * drawW;

        // Center weighting: gaussian-ish bump centered at 0.5
        const centerDist = (xRatio - 0.5) * 2; // -1 to 1
        const centerWeight = Math.exp(-centerDist * centerDist * 2) * centerPeak + (1 - centerPeak * 0.3);

        // Mouse influence: perturb noise seed near mouse
        const mouseDx = xRatio - mx;
        const mouseDy = lineRatio - my;
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        const mouseBoost = mouseInf * Math.exp(-mouseDist * 8) * 2;

        // Noise-based displacement
        const noiseVal = fbm(
          xRatio * frequency + t * 0.3 + li * 0.15,
          lineRatio * 2 + t * 0.1,
          octaves,
        );

        const displacement = noiseVal * amplitude * perspScale * centerWeight + mouseBoost * amplitude * 0.5;
        samplesX.push(x);
        samplesY.push(baseY - displacement); // negative = upward
      }

      // Draw the line with filled occlusion below it
      c.beginPath();
      c.moveTo(samplesX[0]!, samplesY[0]!);
      for (let xi = 1; xi <= xSteps; xi++) {
        c.lineTo(samplesX[xi]!, samplesY[xi]!);
      }

      if (fillOcclusion) {
        // Complete the path as a filled region going down to the bottom of the frame
        // This creates the layered occlusion effect (front lines hide back ones)
        c.lineTo(samplesX[xSteps]!, ch + 10);
        c.lineTo(samplesX[0]!, ch + 10);
        c.closePath();
        c.fillStyle = fillCss;
        c.fill();
      }

      // Stroke the line on top
      c.beginPath();
      c.moveTo(samplesX[0]!, samplesY[0]!);
      for (let xi = 1; xi <= xSteps; xi++) {
        c.lineTo(samplesX[xi]!, samplesY[xi]!);
      }
      c.strokeStyle = strokeCss;
      c.stroke();
    }

    c.shadowBlur = 0;

    // Upload + blit
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas2d);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    if (!this.blitProgram) this.initBlit(gl);
    gl.viewport(0, 0, this.w, this.h);
    gl.disable(gl.BLEND);
    gl.useProgram(this.blitProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(this.blitTexLoc, 0);
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
  }

  getOutputTexture(): WebGLTexture | null {
    return this.outputTexture;
  }
}
