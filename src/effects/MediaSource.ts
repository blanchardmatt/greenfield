import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { EffectActions } from '../core/EffectActions';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'media-source',
  name: 'Media',
  description: 'Load an image, video, or webcam stream as a layer',
  parameters: [
    { id: 'pickImage', type: 'action', label: 'Image', buttonLabel: 'Pick image…', actionId: 'pickImage', default: 0 },
    { id: 'pickVideo', type: 'action', label: 'Video', buttonLabel: 'Pick video…', actionId: 'pickVideo', default: 0 },
    { id: 'useWebcam', type: 'action', label: 'Webcam', buttonLabel: 'Use webcam', actionId: 'useWebcam', default: 0 },
    { id: 'clear', type: 'action', label: 'Clear', buttonLabel: 'Clear', actionId: 'clear', default: 0 },
    { id: 'fitMode', type: 'enum', label: 'Fit', options: [
      { value: 'cover', label: 'Cover' },
      { value: 'contain', label: 'Contain' },
      { value: 'stretch', label: 'Stretch' },
    ], default: 'cover', group: 'Layout' },
    { id: 'mirror', type: 'bool', label: 'Mirror', default: false, group: 'Layout' },
    { id: 'opacity', type: 'float', label: 'Opacity', min: 0, max: 1, step: 0.01, default: 1.0, group: 'Layout' },
    { id: 'rotation', type: 'float', label: 'Rotation', min: -180, max: 180, step: 1, default: 0, group: 'Layout' },
    { id: 'scale', type: 'float', label: 'Scale', min: 0.1, max: 3, step: 0.01, default: 1.0, group: 'Layout' },
    { id: 'tintStrength', type: 'float', label: 'Tint Strength', min: 0, max: 1, step: 0.01, default: 0, group: 'Color' },
    { id: 'tintColor', type: 'color', label: 'Tint Color', default: [1.0, 0.5, 0.8, 1.0], group: 'Color' },
    { id: 'brightness', type: 'float', label: 'Brightness', min: 0, max: 3, step: 0.01, default: 1.0, group: 'Color' },
    { id: 'contrast', type: 'float', label: 'Contrast', min: 0, max: 3, step: 0.01, default: 1.0, group: 'Color' },
    { id: 'saturation', type: 'float', label: 'Saturation', min: 0, max: 3, step: 0.01, default: 1.0, group: 'Color' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

type SourceKind = 'none' | 'image' | 'video' | 'webcam';

export class MediaSource {
  readonly descriptor = DESCRIPTOR;
  private gl: WebGL2RenderingContext | null = null;
  private texture: WebGLTexture | null = null;
  private outputTexture: WebGLTexture | null = null;

  private canvas2d: HTMLCanvasElement | null = null;
  private ctx2d: CanvasRenderingContext2D | null = null;
  private w = 0;
  private h = 0;

  private kind: SourceKind = 'none';
  private image: HTMLImageElement | null = null;
  private video: HTMLVideoElement | null = null;
  private webcamStream: MediaStream | null = null;
  private statusText = 'No media — pick an image, video, or webcam';

  // Blit shader (with input compositing)
  private blitProgram: WebGLProgram | null = null;
  private blitTexLoc: WebGLUniformLocation | null = null;
  private blitInputLoc: WebGLUniformLocation | null = null;
  private blitHasInputLoc: WebGLUniformLocation | null = null;
  private blitVAO: WebGLVertexArrayObject | null = null;

  init(gl: WebGL2RenderingContext): void {
    this.gl = gl;
    this.texture = gl.createTexture()!;

    // Register action handlers
    EffectActions.on('media-source', 'pickImage', () => this.pickFile('image/*', 'image'));
    EffectActions.on('media-source', 'pickVideo', () => this.pickFile('video/*', 'video'));
    EffectActions.on('media-source', 'useWebcam', () => this.startWebcam());
    EffectActions.on('media-source', 'clear', () => this.clear());
  }

  private pickFile(accept: string, kind: 'image' | 'video'): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      this.clear();
      if (kind === 'image') {
        const img = new Image();
        img.onload = () => {
          this.image = img;
          this.kind = 'image';
          this.statusText = file.name;
        };
        img.onerror = () => { this.statusText = 'Failed to load image'; };
        img.src = url;
      } else {
        const vid = document.createElement('video');
        vid.src = url;
        vid.loop = true;
        vid.muted = true;
        vid.playsInline = true;
        vid.play().then(() => {
          this.video = vid;
          this.kind = 'video';
          this.statusText = file.name;
        }).catch(() => { this.statusText = 'Failed to play video'; });
      }
    };
    input.click();
  }

  private async startWebcam(): Promise<void> {
    try {
      this.clear();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      this.webcamStream = stream;
      const vid = document.createElement('video');
      vid.srcObject = stream;
      vid.muted = true;
      vid.playsInline = true;
      await vid.play();
      this.video = vid;
      this.kind = 'webcam';
      this.statusText = 'Webcam active';
    } catch (err) {
      this.statusText = 'Webcam denied or unavailable';
      console.warn('Webcam failed:', err);
    }
  }

  private clear(): void {
    if (this.video) {
      this.video.pause();
      this.video.srcObject = null;
      this.video = null;
    }
    if (this.webcamStream) {
      this.webcamStream.getTracks().forEach((t) => t.stop());
      this.webcamStream = null;
    }
    this.image = null;
    this.kind = 'none';
    this.statusText = 'No media — pick an image, video, or webcam';
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
    inputTextures: Map<string, WebGLTexture>,
  ): void {
    const gl = this.gl!;
    const c = this.ctx2d;
    if (!c || !this.canvas2d) return;

    const fitMode = params.fitMode as string;
    const mirror = params.mirror as boolean;
    const opacity = params.opacity as number;
    const rotation = (params.rotation as number) * Math.PI / 180;
    const scale = params.scale as number;
    const brightness = params.brightness as number;
    const contrast = params.contrast as number;
    const saturation = params.saturation as number;
    const tintStrength = params.tintStrength as number;
    const tintColor = params.tintColor as [number, number, number, number];

    // Clear
    c.clearRect(0, 0, this.w, this.h);

    // Build CSS filter string
    const filters: string[] = [];
    if (brightness !== 1) filters.push(`brightness(${brightness})`);
    if (contrast !== 1) filters.push(`contrast(${contrast})`);
    if (saturation !== 1) filters.push(`saturate(${saturation})`);

    const source = this.kind === 'image' ? this.image : this.video;
    if (source && (this.kind === 'image' || (this.video && this.video.readyState >= 2))) {
      const sw = (this.image?.naturalWidth) || (this.video?.videoWidth) || 1;
      const sh = (this.image?.naturalHeight) || (this.video?.videoHeight) || 1;

      let fitScale: number;
      if (fitMode === 'cover') fitScale = Math.max(this.w / sw, this.h / sh);
      else if (fitMode === 'contain') fitScale = Math.min(this.w / sw, this.h / sh);
      else fitScale = 1; // stretch handled below

      c.save();
      c.globalAlpha = opacity;
      if (filters.length > 0) c.filter = filters.join(' ');
      c.translate(this.w / 2, this.h / 2);
      c.rotate(rotation);
      c.scale(scale * (mirror ? -1 : 1), scale);

      if (fitMode === 'stretch') {
        c.drawImage(source as CanvasImageSource, -this.w / 2, -this.h / 2, this.w, this.h);
      } else {
        const dw = sw * fitScale;
        const dh = sh * fitScale;
        c.drawImage(source as CanvasImageSource, -dw / 2, -dh / 2, dw, dh);
      }
      c.restore();

      // Tint overlay
      if (tintStrength > 0.001) {
        const r = Math.round(tintColor[0] * 255);
        const g = Math.round(tintColor[1] * 255);
        const b = Math.round(tintColor[2] * 255);
        c.save();
        c.globalCompositeOperation = 'multiply';
        c.globalAlpha = tintStrength;
        c.fillStyle = `rgb(${r}, ${g}, ${b})`;
        c.fillRect(0, 0, this.w, this.h);
        c.restore();
      }
    } else {
      // Empty state — show status text
      c.fillStyle = '#0a0a14';
      c.fillRect(0, 0, this.w, this.h);
      c.fillStyle = '#888';
      c.font = '16px -apple-system, sans-serif';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(this.statusText, this.w / 2, this.h / 2);
    }

    // Upload + blit
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas2d);
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
        vec4 bg = texture(uInput, vUv);
        // alpha-over compositing
        fragColor = vec4(top.rgb * top.a + bg.rgb * (1.0 - top.a), 1.0);
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
    this.clear();
    EffectActions.clearEffect('media-source');
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
