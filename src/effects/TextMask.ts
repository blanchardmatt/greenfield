import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'text-mask',
  name: 'Text Mask',
  description: 'Use text as a window revealing the input layer beneath',
  parameters: [
    { id: 'text', type: 'string', label: 'Text', default: 'WONDER', placeholder: 'Type here\u2026 (Enter for new line)', multiline: true, group: 'Content' },
    { id: 'lineHeight', type: 'float', label: 'Line Height', min: 0.6, max: 2.5, step: 0.05, default: 1.1, group: 'Content' },
    { id: 'fontFamily', type: 'enum', label: 'Font', options: [
      { value: 'system-ui, sans-serif', label: 'Sans' },
      { value: 'Georgia, serif', label: 'Serif' },
      { value: '"Courier New", monospace', label: 'Mono' },
      { value: 'Impact, sans-serif', label: 'Display' },
    ], default: 'Impact, sans-serif', group: 'Content' },
    { id: 'fontSize', type: 'float', label: 'Font Size', min: 60, max: 600, step: 1, default: 240, group: 'Content' },
    { id: 'invertMask', type: 'bool', label: 'Invert (text hides)', default: false, group: 'Content' },
    { id: 'animSpeed', type: 'float', label: 'Pan Speed', min: 0, max: 5, step: 0.01, default: 0, group: 'Animation' },
    { id: 'panAmplitude', type: 'float', label: 'Pan Amplitude', min: 0, max: 200, step: 1, default: 0, group: 'Animation' },
    { id: 'maskFeather', type: 'float', label: 'Edge Softness', min: 0, max: 20, step: 0.5, default: 2, group: 'Style' },
    { id: 'bgColor', type: 'color', label: 'Outside Color', default: [0.0, 0.0, 0.0, 1.0], group: 'Style' },
    { id: 'positionX', type: 'float', label: 'X Position', min: 0, max: 1, step: 0.005, default: 0.5, group: 'Layout' },
    { id: 'positionY', type: 'float', label: 'Y Position', min: 0, max: 1, step: 0.005, default: 0.5, group: 'Layout' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class TextMask {
  readonly descriptor = DESCRIPTOR;
  private gl: WebGL2RenderingContext | null = null;
  private maskTexture: WebGLTexture | null = null;
  private outputTexture: WebGLTexture | null = null;
  private canvas2d: HTMLCanvasElement | null = null;
  private ctx2d: CanvasRenderingContext2D | null = null;
  private w = 0;
  private h = 0;

  // Compositing shader: text mask + input → result
  private program: WebGLProgram | null = null;
  private uMaskLoc: WebGLUniformLocation | null = null;
  private uInputLoc: WebGLUniformLocation | null = null;
  private uHasInputLoc: WebGLUniformLocation | null = null;
  private uInvertLoc: WebGLUniformLocation | null = null;
  private uBgColorLoc: WebGLUniformLocation | null = null;
  private vao: WebGLVertexArrayObject | null = null;

  init(gl: WebGL2RenderingContext): void {
    this.gl = gl;
    this.maskTexture = gl.createTexture()!;
    this.initShader();
  }

  private initShader(): void {
    const gl = this.gl!;
    const vs = `#version 300 es
    const vec2 pos[6] = vec2[](vec2(-1,-1),vec2(1,-1),vec2(-1,1),vec2(-1,1),vec2(1,-1),vec2(1,1));
    out vec2 vUv;
    void main() { gl_Position = vec4(pos[gl_VertexID], 0, 1); vUv = pos[gl_VertexID] * 0.5 + 0.5; }`;
    const fs = `#version 300 es
    precision mediump float;
    uniform sampler2D uMask;
    uniform sampler2D uInput;
    uniform int uHasInput;
    uniform int uInvert;
    uniform vec3 uBgColor;
    in vec2 vUv;
    out vec4 fragColor;
    void main() {
      float maskAlpha = texture(uMask, vUv).a;
      if (uInvert == 1) maskAlpha = 1.0 - maskAlpha;
      vec3 inside = uHasInput == 1 ? texture(uInput, vUv).rgb : vec3(1.0);
      vec3 col = mix(uBgColor, inside, maskAlpha);
      fragColor = vec4(col, 1.0);
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
    this.program = p;
    this.uMaskLoc = gl.getUniformLocation(p, 'uMask');
    this.uInputLoc = gl.getUniformLocation(p, 'uInput');
    this.uHasInputLoc = gl.getUniformLocation(p, 'uHasInput');
    this.uInvertLoc = gl.getUniformLocation(p, 'uInvert');
    this.uBgColorLoc = gl.getUniformLocation(p, 'uBgColor');
    this.vao = gl.createVertexArray()!;
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
    gl.bindTexture(gl.TEXTURE_2D, this.maskTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
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
    const lineHeight = (params.lineHeight as number) ?? 1.1;
    const invertMask = params.invertMask as boolean;
    const animSpeed = params.animSpeed as number;
    const panAmplitude = params.panAmplitude as number;
    const feather = params.maskFeather as number;
    const bgColor = params.bgColor as [number, number, number, number];
    const posX = params.positionX as number;
    const posY = params.positionY as number;

    const t = ctx.time * animSpeed;

    // Render text shape into the mask canvas (white text on transparent bg)
    c.clearRect(0, 0, this.w, this.h);
    if (text) {
      c.font = `${fontSize}px ${fontFamily}`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillStyle = '#fff';
      const panX = panAmplitude > 0 ? Math.sin(t) * panAmplitude : 0;
      const panY = panAmplitude > 0 ? Math.cos(t * 0.7) * panAmplitude * 0.5 : 0;
      if (feather > 0.01) {
        c.shadowColor = '#fff';
        c.shadowBlur = feather;
      }
      // Use alphabetic baseline + measured metrics for accurate centering
      c.textBaseline = 'alphabetic';
      const lines = text.split('\n');
      const widest = lines.reduce((a, b) => (a.length >= b.length ? a : b));
      const metrics = c.measureText(widest || 'M');
      const ascent = metrics.actualBoundingBoxAscent || fontSize * 0.8;
      const descent = metrics.actualBoundingBoxDescent || fontSize * 0.2;
      const lineHeightPx = ascent + descent;
      const lineGap = lineHeightPx * lineHeight;
      const totalH = (lines.length - 1) * lineGap + lineHeightPx;
      const cx = posX * this.w + panX;
      const topY = posY * this.h + panY - totalH / 2;
      const firstBaselineY = topY + ascent;
      for (let i = 0; i < lines.length; i++) {
        c.fillText(lines[i]!, cx, firstBaselineY + i * lineGap);
      }
      c.shadowBlur = 0;
    }

    // Upload mask texture
    gl.bindTexture(gl.TEXTURE_2D, this.maskTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas2d);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

    // Composite
    gl.viewport(0, 0, this.w, this.h);
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
    gl.useProgram(this.program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.maskTexture);
    gl.uniform1i(this.uMaskLoc, 0);

    const inputTex = inputTextures.get('input0');
    if (inputTex) {
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, inputTex);
      gl.uniform1i(this.uInputLoc, 1);
      gl.uniform1i(this.uHasInputLoc, 1);
    } else {
      gl.uniform1i(this.uHasInputLoc, 0);
    }

    gl.uniform1i(this.uInvertLoc, invertMask ? 1 : 0);
    gl.uniform3f(this.uBgColorLoc, bgColor[0], bgColor[1], bgColor[2]);

    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindVertexArray(null);
  }

  dispose(): void {
    const gl = this.gl;
    if (!gl) return;
    if (this.maskTexture) gl.deleteTexture(this.maskTexture);
    if (this.program) gl.deleteProgram(this.program);
    if (this.vao) gl.deleteVertexArray(this.vao);
  }

  getOutputTexture(): WebGLTexture | null {
    return this.outputTexture;
  }
}
