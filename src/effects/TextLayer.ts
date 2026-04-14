import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'text-layer',
  name: 'Text Layer',
  description: 'Animated typography with warping, glow, glitch, and marquee modes',
  parameters: [
    { id: 'text', type: 'string', label: 'Text', default: 'PROCEDURAL', placeholder: 'Type here…', group: 'Content' },
    { id: 'fontFamily', type: 'enum', label: 'Font', options: [
      { value: 'system-ui, sans-serif', label: 'Sans' },
      { value: 'Georgia, serif', label: 'Serif' },
      { value: '"Courier New", monospace', label: 'Mono' },
      { value: 'Impact, sans-serif', label: 'Display' },
    ], default: 'Impact, sans-serif', group: 'Content' },
    { id: 'fontSize', type: 'float', label: 'Font Size', min: 16, max: 400, step: 1, default: 120, group: 'Content' },
    { id: 'letterSpacing', type: 'float', label: 'Tracking', min: -10, max: 50, step: 0.5, default: 0, group: 'Content' },
    { id: 'mode', type: 'enum', label: 'Animation', options: [
      { value: 'static', label: 'Static' },
      { value: 'marquee', label: 'Marquee Scroll' },
      { value: 'wave', label: 'Wave' },
      { value: 'pulse', label: 'Pulse' },
      { value: 'glitch', label: 'Glitch' },
      { value: 'typewriter', label: 'Typewriter' },
    ], default: 'wave', group: 'Animation' },
    { id: 'animSpeed', type: 'float', label: 'Speed', min: 0, max: 5, step: 0.01, default: 1.0, group: 'Animation' },
    { id: 'amplitude', type: 'float', label: 'Amplitude', min: 0, max: 100, step: 0.5, default: 25, group: 'Animation' },
    { id: 'fillStyle', type: 'enum', label: 'Fill', options: [
      { value: 'solid', label: 'Solid' },
      { value: 'rainbow', label: 'Rainbow' },
      { value: 'gradient', label: 'Gradient' },
      { value: 'outline', label: 'Outline only' },
    ], default: 'solid', group: 'Style' },
    { id: 'color1', type: 'color', label: 'Color', default: [1.0, 1.0, 1.0, 1.0], group: 'Style' },
    { id: 'color2', type: 'color', label: 'Color 2', default: [0.4, 0.6, 1.0, 1.0], group: 'Style' },
    { id: 'glow', type: 'float', label: 'Glow', min: 0, max: 60, step: 1, default: 18, group: 'Style' },
    { id: 'strokeWidth', type: 'float', label: 'Stroke', min: 0, max: 12, step: 0.5, default: 0, group: 'Style' },
    { id: 'opacity', type: 'float', label: 'Opacity', min: 0, max: 1, step: 0.01, default: 1.0, group: 'Style' },
    { id: 'chromatic', type: 'float', label: 'Chromatic Aberration', min: 0, max: 30, step: 0.5, default: 0, group: 'Style' },
    { id: 'positionX', type: 'float', label: 'X Position', min: 0, max: 1, step: 0.005, default: 0.5, group: 'Layout' },
    { id: 'positionY', type: 'float', label: 'Y Position', min: 0, max: 1, step: 0.005, default: 0.5, group: 'Layout' },
    { id: 'rotation', type: 'float', label: 'Rotation', min: -180, max: 180, step: 1, default: 0, group: 'Layout' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class TextLayer {
  readonly descriptor = DESCRIPTOR;
  private gl: WebGL2RenderingContext | null = null;
  private texture: WebGLTexture | null = null;
  private outputTexture: WebGLTexture | null = null;
  private canvas2d: HTMLCanvasElement | null = null;
  private ctx2d: CanvasRenderingContext2D | null = null;
  private w = 0;
  private h = 0;

  // Blit shader (composite over input)
  private blitProgram: WebGLProgram | null = null;
  private blitTexLoc: WebGLUniformLocation | null = null;
  private blitInputLoc: WebGLUniformLocation | null = null;
  private blitHasInputLoc: WebGLUniformLocation | null = null;
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

  private rgbaToCss(c: [number, number, number, number], alpha: number = c[3]): string {
    return `rgba(${Math.round(c[0] * 255)}, ${Math.round(c[1] * 255)}, ${Math.round(c[2] * 255)}, ${alpha})`;
  }

  render(
    ctx: FrameContext,
    params: ParameterValues,
    inputTextures: Map<string, WebGLTexture>,
  ): void {
    const gl = this.gl!;
    const c = this.ctx2d;
    if (!c || !this.canvas2d) return;

    const text = (params.text as string) || '';
    const fontFamily = params.fontFamily as string;
    const fontSize = params.fontSize as number;
    const letterSpacing = params.letterSpacing as number;
    const mode = params.mode as string;
    const animSpeed = params.animSpeed as number;
    const amplitude = params.amplitude as number;
    const fillStyle = params.fillStyle as string;
    const color1 = params.color1 as [number, number, number, number];
    const color2 = params.color2 as [number, number, number, number];
    const glow = params.glow as number;
    const strokeWidth = params.strokeWidth as number;
    const opacity = params.opacity as number;
    const chromatic = params.chromatic as number;
    const posX = params.positionX as number;
    const posY = params.positionY as number;
    const rotation = (params.rotation as number) * Math.PI / 180;

    const t = ctx.time * animSpeed;

    c.clearRect(0, 0, this.w, this.h);
    if (!text) {
      this.upload(gl, inputTextures);
      return;
    }

    c.font = `${fontSize}px ${fontFamily}`;
    c.textBaseline = 'middle';
    c.textAlign = 'center';

    // Compute char positions for per-character animation
    const chars = Array.from(text);
    // Measure each char width with letterSpacing
    const widths = chars.map((ch) => c.measureText(ch).width + letterSpacing);
    const totalW = widths.reduce((a, b) => a + b, 0) - letterSpacing;

    const baseX = posX * this.w;
    const baseY = posY * this.h;

    c.save();
    c.translate(baseX, baseY);
    c.rotate(rotation);
    c.globalAlpha = opacity;

    // Marquee: shift the whole row horizontally based on time
    let scrollX = 0;
    if (mode === 'marquee') {
      const scrollDist = totalW + this.w;
      scrollX = ((this.w / 2 + totalW / 2) - ((t * 80) % scrollDist));
    }

    // Typewriter: limit visible chars
    let visibleCount = chars.length;
    if (mode === 'typewriter') {
      const cycle = chars.length + 8;
      visibleCount = Math.min(chars.length, Math.floor((t * 5) % cycle));
    }

    // Helper to render a single char with all the styling
    const drawChar = (ch: string, cx: number, cy: number, charIdx: number) => {
      // Glow
      if (glow > 0) {
        c.shadowColor = this.rgbaToCss(color1, 1);
        c.shadowBlur = glow;
      } else {
        c.shadowBlur = 0;
      }

      // Color
      let fillCss: string | CanvasGradient;
      if (fillStyle === 'rainbow') {
        const hue = ((charIdx / Math.max(1, chars.length)) + t * 0.1) % 1;
        fillCss = `hsl(${hue * 360}, 80%, 60%)`;
      } else if (fillStyle === 'gradient') {
        const grad = c.createLinearGradient(0, -fontSize * 0.5, 0, fontSize * 0.5);
        grad.addColorStop(0, this.rgbaToCss(color1, 1));
        grad.addColorStop(1, this.rgbaToCss(color2, 1));
        fillCss = grad;
      } else {
        fillCss = this.rgbaToCss(color1, 1);
      }

      // Chromatic aberration: draw R/G/B offset copies
      if (chromatic > 0.5) {
        c.shadowBlur = 0;
        c.globalCompositeOperation = 'lighter';
        c.fillStyle = `rgba(255, 50, 50, 0.7)`;
        c.fillText(ch, cx + chromatic, cy);
        c.fillStyle = `rgba(50, 255, 80, 0.7)`;
        c.fillText(ch, cx, cy);
        c.fillStyle = `rgba(60, 80, 255, 0.7)`;
        c.fillText(ch, cx - chromatic, cy);
        c.globalCompositeOperation = 'source-over';
        // Re-enable shadow for stroke pass below
        if (glow > 0) {
          c.shadowColor = this.rgbaToCss(color1, 1);
          c.shadowBlur = glow;
        }
      } else if (fillStyle !== 'outline') {
        c.fillStyle = fillCss;
        c.fillText(ch, cx, cy);
      }

      if (strokeWidth > 0 || fillStyle === 'outline') {
        c.lineWidth = strokeWidth || 2;
        c.strokeStyle = this.rgbaToCss(color1, 1);
        c.shadowBlur = 0;
        c.strokeText(ch, cx, cy);
      }
    };

    // Glitch: occasionally substitute random chars + offset
    const glitchOffsets: Array<{ dx: number; dy: number; sub: string | null }> = [];
    if (mode === 'glitch') {
      const glitchChars = '!@#$%^&*▓█▒░│▌▐';
      for (let i = 0; i < chars.length; i++) {
        const intensity = 0.3 + Math.sin(t * 4 + i) * 0.5;
        const glitch = Math.random() < intensity * 0.05;
        glitchOffsets.push({
          dx: glitch ? (Math.random() - 0.5) * amplitude * 0.5 : 0,
          dy: glitch ? (Math.random() - 0.5) * amplitude * 0.5 : 0,
          sub: glitch ? glitchChars[Math.floor(Math.random() * glitchChars.length)]! : null,
        });
      }
    }

    let cursorX = scrollX - totalW / 2;
    for (let i = 0; i < chars.length; i++) {
      if (i >= visibleCount) break;
      const ch = chars[i]!;
      const w = widths[i]!;
      const charCx = cursorX + w / 2;
      let charCy = 0;

      // Per-char animation
      if (mode === 'wave') {
        charCy = Math.sin(t * 3 + i * 0.5) * amplitude;
      } else if (mode === 'pulse') {
        const scale = 1.0 + Math.sin(t * 4 + i * 0.4) * (amplitude * 0.01);
        c.save();
        c.translate(charCx, charCy);
        c.scale(scale, scale);
        const sub = chars[i]!;
        drawChar(sub, 0, 0, i);
        c.restore();
        cursorX += w;
        continue;
      } else if (mode === 'glitch') {
        const g = glitchOffsets[i]!;
        const sub = g.sub ?? ch;
        drawChar(sub, charCx + g.dx, charCy + g.dy, i);
        cursorX += w;
        continue;
      }

      drawChar(ch, charCx, charCy, i);
      cursorX += w;
    }

    c.restore();
    c.shadowBlur = 0;

    this.upload(gl, inputTextures);
  }

  private upload(gl: WebGL2RenderingContext, inputTextures: Map<string, WebGLTexture>): void {
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas2d!);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

    if (!this.blitProgram) this.initBlit(gl);
    gl.viewport(0, 0, this.w, this.h);
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
    gl.useProgram(this.blitProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(this.blitTexLoc, 0);

    const inputTex = inputTextures.get('input0');
    if (inputTex) {
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, inputTex);
      gl.uniform1i(this.blitInputLoc, 1);
      gl.uniform1i(this.blitHasInputLoc, 1);
    } else {
      gl.uniform1i(this.blitHasInputLoc, 0);
    }

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
    uniform sampler2D uInput;
    uniform int uHasInput;
    in vec2 vUv;
    out vec4 fragColor;
    void main() {
      vec4 top = texture(uTex, vUv);
      if (uHasInput == 1) {
        vec3 bg = texture(uInput, vUv).rgb;
        fragColor = vec4(top.rgb + bg * (1.0 - top.a), 1.0);
      } else {
        fragColor = vec4(top.rgb, 1.0);
      }
    }`;
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
    this.blitInputLoc = gl.getUniformLocation(p, 'uInput');
    this.blitHasInputLoc = gl.getUniformLocation(p, 'uHasInput');
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
