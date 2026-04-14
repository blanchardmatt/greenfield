import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

type HandLandmarkerType = HandLandmarker;

// Hand skeleton connections (MediaPipe 21 landmarks)
const HAND_CONNECTIONS: Array<[number, number]> = [
  // Thumb
  [0, 1], [1, 2], [2, 3], [3, 4],
  // Index finger
  [0, 5], [5, 6], [6, 7], [7, 8],
  // Middle finger
  [5, 9], [9, 10], [10, 11], [11, 12],
  // Ring finger
  [9, 13], [13, 14], [14, 15], [15, 16],
  // Pinky
  [13, 17], [17, 18], [18, 19], [19, 20],
  // Palm
  [0, 17],
];

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'hand-tracking',
  name: 'Hand Tracking',
  description: 'Neon skeleton with inter-hand beams and glowing orb',
  parameters: [
    { id: 'lineWidth', type: 'float', label: 'Line Width', min: 1, max: 12, step: 0.5, default: 4, group: 'Skeleton' },
    { id: 'glowStrength', type: 'float', label: 'Glow', min: 0, max: 30, step: 0.5, default: 12, group: 'Skeleton' },
    { id: 'jointSize', type: 'float', label: 'Joint Size', min: 0, max: 15, step: 0.5, default: 5, group: 'Skeleton' },
    { id: 'beamMode', type: 'enum', label: 'Inter-hand Beams', options: [
      { value: '0', label: 'Off' },
      { value: '1', label: 'All landmarks' },
      { value: '2', label: 'Fingertips' },
      { value: '3', label: 'Palms only' },
    ], default: '2', group: 'Beams' },
    { id: 'beamWidth', type: 'float', label: 'Beam Width', min: 0.5, max: 10, step: 0.5, default: 3, group: 'Beams' },
    { id: 'beamGlow', type: 'float', label: 'Beam Glow', min: 0, max: 50, step: 1, default: 20, group: 'Beams' },
    { id: 'orbSize', type: 'float', label: 'Orb Size', min: 0, max: 80, step: 1, default: 25, group: 'Orb' },
    { id: 'orbGlow', type: 'float', label: 'Orb Glow', min: 0, max: 80, step: 1, default: 40, group: 'Orb' },
    { id: 'orbPulse', type: 'float', label: 'Orb Pulse', min: 0, max: 1, step: 0.01, default: 0.4, group: 'Orb' },
    { id: 'colorSpeed', type: 'float', label: 'Color Speed', min: 0, max: 5, step: 0.05, default: 1.0, group: 'Color' },
    { id: 'saturation', type: 'float', label: 'Saturation', min: 0, max: 1, step: 0.01, default: 0.9, group: 'Color' },
    { id: 'showVideo', type: 'bool', label: 'Show Webcam', default: true, group: 'Display' },
    { id: 'videoOpacity', type: 'float', label: 'Video Dimming', min: 0, max: 1, step: 0.01, default: 0.5, group: 'Display' },
    { id: 'mirror', type: 'bool', label: 'Mirror', default: true, group: 'Display' },
    { id: 'trailFade', type: 'float', label: 'Trail Fade', min: 0, max: 0.99, step: 0.01, default: 0.0, group: 'Style' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class HandTracking {
  readonly descriptor = DESCRIPTOR;
  private gl: WebGL2RenderingContext | null = null;
  private texture: WebGLTexture | null = null;
  private outputTexture: WebGLTexture | null = null;
  private canvas2d: HTMLCanvasElement | null = null;
  private ctx2d: CanvasRenderingContext2D | null = null;
  private w = 0;
  private h = 0;

  // MediaPipe + webcam
  private video: HTMLVideoElement | null = null;
  private landmarker: HandLandmarkerType | null = null;
  private lastVideoTime = -1;
  private currentLandmarks: Array<Array<{ x: number; y: number; z: number }>> = [];
  private ready = false;
  private errorMessage: string | null = null;

  // Blit program
  private blitProgram: WebGLProgram | null = null;
  private blitTexLoc: WebGLUniformLocation | null = null;
  private blitVAO: WebGLVertexArrayObject | null = null;

  init(gl: WebGL2RenderingContext): void {
    this.gl = gl;
    this.texture = gl.createTexture()!;
    void this.setupCameraAndModel();
  }

  private async setupCameraAndModel(): Promise<void> {
    try {
      // Request webcam
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      this.video = document.createElement('video');
      this.video.srcObject = stream;
      this.video.playsInline = true;
      this.video.muted = true;
      await this.video.play();

      // Load MediaPipe Hands
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/wasm',
      );
      this.landmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 2,
      });

      this.ready = true;
    } catch (err) {
      console.warn('Hand tracking init failed:', err);
      this.errorMessage = err instanceof Error ? err.message : 'Failed to initialize camera/model';
    }
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
    ctx: FrameContext,
    params: ParameterValues,
    _inputTextures: Map<string, WebGLTexture>,
  ): void {
    const gl = this.gl!;
    const c = this.ctx2d;
    if (!c || !this.canvas2d) return;

    const lineWidth = params.lineWidth as number;
    const glowStrength = params.glowStrength as number;
    const jointSize = params.jointSize as number;
    const beamMode = parseInt(params.beamMode as string, 10);
    const beamWidth = params.beamWidth as number;
    const beamGlow = params.beamGlow as number;
    const orbSize = params.orbSize as number;
    const orbGlow = params.orbGlow as number;
    const orbPulse = params.orbPulse as number;
    const colorSpeed = params.colorSpeed as number;
    const saturation = params.saturation as number;
    const showVideo = params.showVideo as boolean;
    const videoOpacity = params.videoOpacity as number;
    const mirror = params.mirror as boolean;
    const trailFade = params.trailFade as number;

    // Clear / fade
    if (trailFade > 0.01) {
      // Semi-transparent fill for motion trails
      c.fillStyle = `rgba(0, 0, 0, ${1 - trailFade})`;
      c.fillRect(0, 0, this.w, this.h);
    } else {
      c.clearRect(0, 0, this.w, this.h);
      c.fillStyle = '#000';
      c.fillRect(0, 0, this.w, this.h);
    }

    // Draw status / error messages
    if (this.errorMessage) {
      this.drawMessage(c, 'Hand tracking unavailable:', this.errorMessage);
      this.uploadAndBlit(gl);
      return;
    }
    if (!this.ready) {
      this.drawMessage(c, 'Starting camera...', 'Please allow camera access');
      this.uploadAndBlit(gl);
      return;
    }

    // Run hand detection
    if (this.video && this.landmarker && this.video.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = this.video.currentTime;
      const result = this.landmarker.detectForVideo(this.video, performance.now());
      this.currentLandmarks = result.landmarks ?? [];
    }

    // Draw video frame
    if (showVideo && this.video) {
      c.save();
      c.globalAlpha = videoOpacity;
      if (mirror) {
        c.translate(this.w, 0);
        c.scale(-1, 1);
      }
      // Cover-fit the video to canvas
      const vw = this.video.videoWidth || 640;
      const vh = this.video.videoHeight || 480;
      const scale = Math.max(this.w / vw, this.h / vh);
      const dw = vw * scale;
      const dh = vh * scale;
      const dx = (this.w - dw) / 2;
      const dy = (this.h - dh) / 2;
      c.drawImage(this.video, dx, dy, dw, dh);
      c.restore();
    }

    // Draw hand skeletons with neon rainbow
    const t = ctx.time * colorSpeed;

    // Project all hands to canvas space
    const allHands = this.currentLandmarks
      .filter((h) => h && h.length >= 21)
      .map((hand) =>
        hand.map((lm) => {
          let px = lm.x * this.w;
          const py = lm.y * this.h;
          if (mirror) px = this.w - px;
          return { x: px, y: py, z: lm.z };
        }),
      );

    c.lineCap = 'round';
    c.lineJoin = 'round';

    // Draw skeletons
    for (let hi = 0; hi < allHands.length; hi++) {
      const pts = allHands[hi]!;

      // Connections with glow
      for (let i = 0; i < HAND_CONNECTIONS.length; i++) {
        const [a, b] = HAND_CONNECTIONS[i]!;
        const p1 = pts[a]!;
        const p2 = pts[b]!;

        const hue = ((i / HAND_CONNECTIONS.length) + hi * 0.3 + t * 0.1) % 1;
        const color = this.hsla(hue * 360, saturation, 0.6, 1);
        const glowColor = this.hsla(hue * 360, saturation, 0.5, 0.6);

        if (glowStrength > 0) {
          c.strokeStyle = glowColor;
          c.lineWidth = lineWidth + glowStrength;
          c.shadowColor = color;
          c.shadowBlur = glowStrength;
          c.beginPath();
          c.moveTo(p1.x, p1.y);
          c.lineTo(p2.x, p2.y);
          c.stroke();
        }

        c.shadowBlur = 0;
        c.strokeStyle = color;
        c.lineWidth = lineWidth;
        c.beginPath();
        c.moveTo(p1.x, p1.y);
        c.lineTo(p2.x, p2.y);
        c.stroke();
      }

      // Joints
      if (jointSize > 0) {
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i]!;
          const hue = ((i / pts.length) + hi * 0.3 + t * 0.1) % 1;
          const color = this.hsla(hue * 360, saturation, 0.7, 1);
          const glowColor = this.hsla(hue * 360, saturation, 0.5, 0.7);

          if (glowStrength > 0) {
            c.fillStyle = glowColor;
            c.shadowColor = color;
            c.shadowBlur = glowStrength;
            c.beginPath();
            c.arc(p.x, p.y, jointSize + glowStrength * 0.3, 0, Math.PI * 2);
            c.fill();
          }

          c.shadowBlur = 0;
          c.fillStyle = color;
          c.beginPath();
          c.arc(p.x, p.y, jointSize, 0, Math.PI * 2);
          c.fill();
        }
      }
    }

    // === Inter-hand beams ===
    if (beamMode > 0 && allHands.length >= 2) {
      const handA = allHands[0]!;
      const handB = allHands[1]!;

      // Which landmarks to connect
      let pairs: number[] = [];
      if (beamMode === 1) {
        // All 21 landmarks
        for (let i = 0; i < 21; i++) pairs.push(i);
      } else if (beamMode === 2) {
        // Fingertips: thumb=4, index=8, middle=12, ring=16, pinky=20
        pairs = [4, 8, 12, 16, 20];
      } else if (beamMode === 3) {
        // Palms: wrist=0, index base=5, middle base=9, ring base=13, pinky base=17
        pairs = [0, 5, 9, 13, 17];
      }

      c.lineCap = 'round';
      for (let i = 0; i < pairs.length; i++) {
        const idx = pairs[i]!;
        const p1 = handA[idx]!;
        const p2 = handB[idx]!;

        // Each beam has its own hue that cycles over time
        const hue = ((i / pairs.length) + t * 0.15) % 1;
        const color = this.hsla(hue * 360, saturation, 0.65, 1);
        const glowColor = this.hsla(hue * 360, saturation, 0.5, 0.5);

        // Outer glow
        if (beamGlow > 0) {
          c.strokeStyle = glowColor;
          c.lineWidth = beamWidth + beamGlow * 0.6;
          c.shadowColor = color;
          c.shadowBlur = beamGlow;
          c.beginPath();
          c.moveTo(p1.x, p1.y);
          c.lineTo(p2.x, p2.y);
          c.stroke();
        }

        // Inner bright beam
        c.shadowBlur = 0;
        c.strokeStyle = color;
        c.lineWidth = beamWidth;
        c.beginPath();
        c.moveTo(p1.x, p1.y);
        c.lineTo(p2.x, p2.y);
        c.stroke();
      }
    }

    // === Central glowing orb between the hands ===
    if (orbSize > 0 && allHands.length >= 2) {
      // Use palm centers (landmark 9 = middle-finger MCP) as anchors
      const c1 = allHands[0]![9]!;
      const c2 = allHands[1]![9]!;
      const cx = (c1.x + c2.x) * 0.5;
      const cy = (c1.y + c2.y) * 0.5;
      const handDist = Math.hypot(c2.x - c1.x, c2.y - c1.y);

      // Orb grows larger as hands move apart (more "energy gathered")
      const distFactor = Math.min(2, handDist / (this.w * 0.25));
      // Pulse
      const pulse = 1.0 + Math.sin(ctx.time * 4) * orbPulse;
      const r = orbSize * distFactor * pulse;

      // Multi-layer radial gradient for rich glow
      const orbHue = (t * 0.3) % 1;
      const grad = c.createRadialGradient(cx, cy, 0, cx, cy, r + orbGlow);
      grad.addColorStop(0, this.hsla(orbHue * 360, saturation, 0.9, 1));
      grad.addColorStop(0.15, this.hsla(orbHue * 360, saturation, 0.7, 0.9));
      grad.addColorStop(0.4, this.hsla(((orbHue + 0.1) % 1) * 360, saturation, 0.5, 0.5));
      grad.addColorStop(0.75, this.hsla(((orbHue + 0.2) % 1) * 360, saturation, 0.4, 0.15));
      grad.addColorStop(1, this.hsla(((orbHue + 0.3) % 1) * 360, saturation, 0.3, 0));

      c.shadowBlur = 0;
      c.globalCompositeOperation = 'lighter';
      c.fillStyle = grad;
      c.beginPath();
      c.arc(cx, cy, r + orbGlow, 0, Math.PI * 2);
      c.fill();

      // Bright core
      const coreGrad = c.createRadialGradient(cx, cy, 0, cx, cy, r * 0.5);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      coreGrad.addColorStop(0.5, this.hsla(orbHue * 360, saturation * 0.5, 0.95, 0.8));
      coreGrad.addColorStop(1, this.hsla(orbHue * 360, saturation, 0.6, 0));
      c.fillStyle = coreGrad;
      c.beginPath();
      c.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
      c.fill();

      c.globalCompositeOperation = 'source-over';
    }

    // Reset shadow
    c.shadowBlur = 0;

    // Upload to GL and draw
    this.uploadAndBlit(gl);
  }

  private hsla(h: number, s: number, l: number, a: number): string {
    return `hsla(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${a})`;
  }

  private drawMessage(
    c: CanvasRenderingContext2D,
    title: string,
    subtitle: string,
  ): void {
    c.fillStyle = '#fff';
    c.font = '20px -apple-system, sans-serif';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(title, this.w / 2, this.h / 2 - 15);
    c.font = '14px -apple-system, sans-serif';
    c.fillStyle = '#888';
    c.fillText(subtitle, this.w / 2, this.h / 2 + 15);
  }

  private uploadAndBlit(gl: WebGL2RenderingContext): void {
    if (!this.canvas2d) return;
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas2d);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.viewport(0, 0, this.w, this.h);
    gl.disable(gl.BLEND);
    if (!this.blitProgram) this.initBlit(gl);
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

    // Stop camera
    if (this.video) {
      const stream = this.video.srcObject as MediaStream | null;
      if (stream) stream.getTracks().forEach((t) => t.stop());
      this.video = null;
    }
    if (this.landmarker) {
      this.landmarker.close();
      this.landmarker = null;
    }
  }

  getOutputTexture(_portId?: string): WebGLTexture | null {
    return this.outputTexture;
  }
}
