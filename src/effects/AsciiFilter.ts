import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { BaseEffect } from './BaseEffect';
import vertSrc from '../shaders/common/fullscreen-quad.vert?raw';
import fragSrc from '../shaders/ascii/ascii.frag?raw';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'ascii-filter',
  name: 'ASCII Filter',
  description: 'Render the input texture as ASCII characters',
  parameters: [
    { id: 'cellSize', type: 'float', label: 'Cell Size', min: 4, max: 40, step: 1, default: 12, group: 'Shape' },
    { id: 'charSet', type: 'enum', label: 'Charset', options: [
      { value: 'classic', label: 'Classic ( .:-=+*#%@)' },
      { value: 'blocks', label: 'Blocks (░▒▓█)' },
      { value: 'binary', label: 'Binary (01)' },
      { value: 'dense', label: 'Dense' },
      { value: 'mathy', label: 'Math/Symbols' },
    ], default: 'classic', group: 'Shape' },
    { id: 'brightness', type: 'float', label: 'Brightness', min: 0, max: 3, step: 0.01, default: 1.0, group: 'Tone' },
    { id: 'contrast', type: 'float', label: 'Contrast', min: 0.1, max: 4, step: 0.01, default: 1.4, group: 'Tone' },
    { id: 'invert', type: 'bool', label: 'Invert', default: false, group: 'Tone' },
    { id: 'fgColor', type: 'color', label: 'Char Color', default: [0.4, 1.0, 0.6, 1.0], group: 'Color' },
    { id: 'bgColor', type: 'color', label: 'BG Color', default: [0.0, 0.0, 0.0, 1.0], group: 'Color' },
    { id: 'colorize', type: 'float', label: 'Use Source Color', min: 0, max: 1, step: 0.01, default: 0, group: 'Color' },
  ],
  inputs: [{ id: 'input0', label: 'Input', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

const CHARSETS: Record<string, string> = {
  classic: ' .:-=+*#%@',
  blocks: ' ░▒▓█',
  binary: ' .01',
  dense: ' `.,-~+*=&%@$#',
  mathy: ' .:+×*≈≡∞◆▣',
};

export class AsciiFilter extends BaseEffect {
  readonly descriptor = DESCRIPTOR;
  private atlasTexture: WebGLTexture | null = null;
  private atlasCharCount = 0;
  private currentCharSet: string = '';

  init(gl: WebGL2RenderingContext): void {
    this.gl = gl;
    this.shader = this.createShader(gl, vertSrc, fragSrc);
    this.atlasTexture = gl.createTexture()!;
    this.buildAtlas('classic');
  }

  private buildAtlas(setKey: string): void {
    const gl = this.gl!;
    const chars = CHARSETS[setKey] ?? CHARSETS['classic']!;
    const cellPx = 64;
    const w = cellPx * chars.length;
    const h = cellPx;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const c = canvas.getContext('2d')!;
    c.fillStyle = '#000';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#fff';
    c.font = `${Math.round(cellPx * 0.85)}px "Courier New", monospace`;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    for (let i = 0; i < chars.length; i++) {
      c.fillText(chars[i]!, i * cellPx + cellPx / 2, h / 2 + cellPx * 0.05);
    }

    gl.bindTexture(gl.TEXTURE_2D, this.atlasTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    this.atlasCharCount = chars.length;
    this.currentCharSet = setKey;
  }

  render(
    ctx: FrameContext,
    params: ParameterValues,
    inputTextures: Map<string, WebGLTexture>,
  ): void {
    const { gl, resolution } = ctx;
    const s = this.shader!;

    const charSet = params.charSet as string;
    if (charSet !== this.currentCharSet) {
      this.buildAtlas(charSet);
    }

    s.use();
    s.setVec2('u_resolution', resolution[0], resolution[1]);
    s.setFloat('u_cellSize', params.cellSize as number);
    s.setInt('u_charCount', this.atlasCharCount);
    s.setFloat('u_brightness', params.brightness as number);
    s.setFloat('u_contrast', params.contrast as number);
    s.setFloat('u_invert', (params.invert as boolean) ? 1.0 : 0.0);
    s.setFloat('u_colorize', params.colorize as number);

    const fg = params.fgColor as [number, number, number, number];
    s.setVec4('u_fgColor', fg[0], fg[1], fg[2], fg[3]);
    const bg = params.bgColor as [number, number, number, number];
    s.setVec4('u_bgColor', bg[0], bg[1], bg[2], bg[3]);

    const inputTex = inputTextures.get('input0');
    if (inputTex) {
      s.setTexture('u_inputTexture', inputTex, 0);
      s.setInt('u_hasInput', 1);
    } else {
      s.setInt('u_hasInput', 0);
    }
    s.setTexture('u_charAtlas', this.atlasTexture!, 1);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  dispose(): void {
    super.dispose();
    if (this.gl && this.atlasTexture) this.gl.deleteTexture(this.atlasTexture);
  }
}
