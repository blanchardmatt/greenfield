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
    { id: 'showSkeleton', type: 'bool', label: 'Show Skeleton', default: true, group: 'Skeleton' },
    { id: 'lineWidth', type: 'float', label: 'Line Width', min: 1, max: 12, step: 0.5, default: 4, group: 'Skeleton' },
    { id: 'glowStrength', type: 'float', label: 'Glow', min: 0, max: 30, step: 0.5, default: 12, group: 'Skeleton' },
    { id: 'jointSize', type: 'float', label: 'Joint Size', min: 0, max: 15, step: 0.5, default: 5, group: 'Skeleton' },
    { id: 'beamMode', type: 'enum', label: 'Inter-hand Beams', options: [
      { value: '0', label: 'Off' },
      { value: '1', label: 'All landmarks' },
      { value: '2', label: 'Fingertips' },
      { value: '3', label: 'Palms only' },
    ], default: '2', group: 'Beams' },
    { id: 'beamWidth', type: 'float', label: 'Beam Width', min: 0.5, max: 10, step: 0.5, default: 2, group: 'Beams' },
    { id: 'beamGlow', type: 'float', label: 'Beam Glow', min: 0, max: 50, step: 1, default: 24, group: 'Beams' },
    { id: 'beamOpacity', type: 'float', label: 'Beam Opacity', min: 0, max: 1, step: 0.01, default: 0.55, group: 'Beams' },
    { id: 'beamJitter', type: 'float', label: 'Plasma Jitter', min: 0, max: 1, step: 0.01, default: 0.5, group: 'Beams' },
    { id: 'beamFilaments', type: 'int', label: 'Filaments', min: 1, max: 5, default: 3, group: 'Beams' },
    { id: 'energyFlow', type: 'float', label: 'Energy Flow', min: 0, max: 2, step: 0.01, default: 1.0, group: 'Beams' },
    { id: 'energySpeed', type: 'float', label: 'Flow Speed', min: 0, max: 5, step: 0.05, default: 1.5, group: 'Beams' },
    { id: 'energyPulses', type: 'int', label: 'Pulse Count', min: 0, max: 8, default: 3, group: 'Beams' },
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

    const showSkeleton = params.showSkeleton as boolean;
    const lineWidth = params.lineWidth as number;
    const glowStrength = params.glowStrength as number;
    const jointSize = params.jointSize as number;
    const beamMode = parseInt(params.beamMode as string, 10);
    const beamWidth = params.beamWidth as number;
    const beamGlow = params.beamGlow as number;
    const beamOpacity = params.beamOpacity as number;
    const beamJitter = params.beamJitter as number;
    const beamFilaments = params.beamFilaments as number;
    const energyFlow = params.energyFlow as number;
    const energySpeed = params.energySpeed as number;
    const energyPulses = params.energyPulses as number;
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

    // Compute video cover-fit transform (used for video draw AND landmark mapping)
    const vw = this.video?.videoWidth || 640;
    const vh = this.video?.videoHeight || 480;
    const scale = Math.max(this.w / vw, this.h / vh);
    const dw = vw * scale;
    const dh = vh * scale;
    const dx = (this.w - dw) / 2;
    const dy = (this.h - dh) / 2;

    // Draw video frame
    if (showVideo && this.video) {
      c.save();
      c.globalAlpha = videoOpacity;
      if (mirror) {
        c.translate(this.w, 0);
        c.scale(-1, 1);
      }
      c.drawImage(this.video, dx, dy, dw, dh);
      c.restore();
    }

    // Draw hand skeletons with neon rainbow
    const t = ctx.time * colorSpeed;

    // Project all hands to canvas space using SAME cover-fit transform as video
    // MediaPipe landmarks are in video-frame normalized coords (0..1 of video)
    const allHands = this.currentLandmarks
      .filter((h) => h && h.length >= 21)
      .map((hand) =>
        hand.map((lm) => {
          // Scale to video rect on canvas
          let px = dx + lm.x * dw;
          const py = dy + lm.y * dh;
          if (mirror) px = this.w - px;
          return { x: px, y: py, z: lm.z };
        }),
      );

    c.lineCap = 'round';
    c.lineJoin = 'round';

    // Draw skeletons (optional)
    if (showSkeleton) {
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
    }

    // === Compute orb parameters (needed by beams for bowing effect) ===
    let orbCx = 0, orbCy = 0, orbRadius = 0, orbIntensity = 0, orbHue = 0;
    let hasOrb = false;

    if (allHands.length >= 2 && orbSize > 0) {
      const c1 = allHands[0]![9]!;
      const c2 = allHands[1]![9]!;
      orbCx = (c1.x + c2.x) * 0.5;
      orbCy = (c1.y + c2.y) * 0.5;
      const handDist = Math.hypot(c2.x - c1.x, c2.y - c1.y);

      // Exponential growth with hand distance — very dramatic at full spread
      const norm = handDist / (this.w * 0.5); // 0..1+ as hands spread
      // Curve: 0.15 at idle → exponentially larger as hands spread
      const distFactor = 0.25 + Math.pow(Math.min(1.5, norm), 2.2) * 2.5;
      const pulse = 1.0 + Math.sin(ctx.time * 4) * orbPulse;

      orbRadius = orbSize * distFactor * pulse;
      orbIntensity = Math.min(2.5, distFactor); // used for glow & beam push
      orbHue = (t * 0.3) % 1;
      hasOrb = true;
    }

    // === Render orb FIRST (behind beams) ===
    // This makes the beams appear to wrap in front of the orb, simulating
    // the orb sitting "inside" the volume defined by the beams.
    if (hasOrb) {
      this.drawOrb(c, orbCx, orbCy, orbRadius, orbIntensity, orbHue, orbGlow, saturation);
    }

    // === Inter-hand beams (bow outward, pushed by the orb) ===
    if (beamMode > 0 && allHands.length >= 2) {
      const handA = allHands[0]!;
      const handB = allHands[1]!;

      let pairs: number[] = [];
      if (beamMode === 1) {
        for (let i = 0; i < 21; i++) pairs.push(i);
      } else if (beamMode === 2) {
        pairs = [4, 8, 12, 16, 20];
      } else if (beamMode === 3) {
        pairs = [0, 5, 9, 13, 17];
      }

      c.lineCap = 'round';

      // Amount the orb displaces beams — scales with orb radius & intensity
      const pushStrength = hasOrb ? (orbRadius * 0.9 + 20) * orbIntensity : 0;

      for (let i = 0; i < pairs.length; i++) {
        const idx = pairs[i]!;
        const p1 = handA[idx]!;
        const p2 = handB[idx]!;

        // Beam midpoint and length
        const mx2 = (p1.x + p2.x) * 0.5;
        const my2 = (p1.y + p2.y) * 0.5;
        const beamLen = Math.hypot(p2.x - p1.x, p2.y - p1.y);

        // Compute displaced control point: push the midpoint away from orb
        let ctrlX = mx2;
        let ctrlY = my2;

        if (hasOrb && pushStrength > 0) {
          let dx = mx2 - orbCx;
          let dy = my2 - orbCy;
          let offsetLen = Math.hypot(dx, dy);

          if (offsetLen < 1) {
            // Beam passes through orb center — use perpendicular to beam as push dir
            // Pick a stable side based on beam index (alternates up/down)
            const bx = p2.x - p1.x;
            const by = p2.y - p1.y;
            const sign = (i % 2 === 0) ? 1 : -1;
            dx = -by * sign;
            dy = bx * sign;
            offsetLen = Math.hypot(dx, dy) || 1;
          }

          // Falloff: push is strong if midpoint is near the orb, falls off with distance
          const falloff = Math.exp(-offsetLen / (orbRadius * 1.5 + 40));
          const push = pushStrength * falloff;

          // Normalize direction and offset the control point outward
          const nx = dx / offsetLen;
          const ny = dy / offsetLen;
          ctrlX = mx2 + nx * push;
          ctrlY = my2 + ny * push;
        }

        // Color
        const hue = ((i / pairs.length) + t * 0.15) % 1;

        // Base bezier control point (so curve midpoint lands at target midpoint)
        const bezCpX = 2 * ctrlX - mx2;
        const bezCpY = 2 * ctrlY - my2;

        // Perpendicular to beam direction — used to scatter filaments sideways
        const beamDx = p2.x - p1.x;
        const beamDy = p2.y - p1.y;
        const beamMag = Math.max(1, Math.hypot(beamDx, beamDy));
        const perpX = -beamDy / beamMag;
        const perpY = beamDx / beamMag;

        // Render beam using additive blending for true plasma glow
        c.save();
        c.globalCompositeOperation = 'lighter';

        // 1) Soft outer halo — wide, very transparent, blurred
        if (beamGlow > 0) {
          c.strokeStyle = this.hsla(hue * 360, saturation, 0.45, 0.18 * beamOpacity);
          c.lineWidth = beamWidth + beamGlow * 1.2;
          c.shadowColor = this.hsla(hue * 360, saturation, 0.55, 1);
          c.shadowBlur = beamGlow * 1.5;
          c.beginPath();
          c.moveTo(p1.x, p1.y);
          c.quadraticCurveTo(bezCpX, bezCpY, p2.x, p2.y);
          c.stroke();
        }

        // 2) Multiple thin jittering filaments — the "plasma" body
        const filamentCount = Math.max(1, beamFilaments);
        const jitterAmount = beamJitter * (20 + beamGlow * 0.5);
        // Per-filament time offset so they wave independently
        for (let fi = 0; fi < filamentCount; fi++) {
          // Each filament has its own phase & side offset
          const phase1 = t * 3 + i * 2.1 + fi * 1.3;
          const phase2 = t * 4.3 + i * 3.7 + fi * 2.7;
          // Time-varying perpendicular offset at the control point
          const jx = (Math.sin(phase1) + Math.sin(phase1 * 1.7 + 0.8)) * jitterAmount * 0.5;
          const jy = (Math.sin(phase2) + Math.cos(phase2 * 1.3 + 0.5)) * jitterAmount * 0.5;
          // Center filaments cluster near the base; others fan slightly
          const sideOffset = (fi - (filamentCount - 1) / 2) * (beamWidth * 1.2);
          const fcpX = bezCpX + perpX * (jx + sideOffset) + jx * 0.3;
          const fcpY = bezCpY + perpY * (jy + sideOffset) + jy * 0.3;

          // Slight hue shift + brightness variation per filament
          const fhue = (hue + fi * 0.02) % 1;
          const flicker = 0.7 + 0.3 * Math.sin(t * 7 + i * 3 + fi * 5);
          c.strokeStyle = this.hsla(fhue * 360, saturation, 0.7, beamOpacity * flicker * 0.85);
          c.lineWidth = beamWidth * (0.5 + Math.random() * 0.2);
          c.shadowColor = this.hsla(fhue * 360, saturation, 0.65, 1);
          c.shadowBlur = beamGlow * 0.4;

          c.beginPath();
          c.moveTo(p1.x, p1.y);
          c.quadraticCurveTo(fcpX, fcpY, p2.x, p2.y);
          c.stroke();
        }

        // 3) Thin hot core (subtle — only on central filament)
        c.strokeStyle = this.hsla(hue * 360, saturation * 0.3, 0.95, beamOpacity * 0.45);
        c.lineWidth = Math.max(0.8, beamWidth * 0.35);
        c.shadowBlur = 0;
        c.beginPath();
        c.moveTo(p1.x, p1.y);
        c.quadraticCurveTo(bezCpX, bezCpY, p2.x, p2.y);
        c.stroke();

        c.restore();

        // === Flowing energy: animated dashed overlay ===
        // A bright dashed layer whose offset animates over time — gives the
        // impression of light streaming back and forth through the beam
        if (energyFlow > 0.01) {
          // Direction alternates per beam so energy moves both ways
          const direction = (i % 2 === 0) ? 1 : -1;
          const dashSpacing = Math.max(30, beamLen * 0.08);
          const dashLen = dashSpacing * 0.35;

          c.save();
          c.globalCompositeOperation = 'lighter';
          c.setLineDash([dashLen, dashSpacing - dashLen]);
          c.lineDashOffset = -direction * ctx.time * (50 + energySpeed * 150);

          // Translucent streaming dashes — additive blend for plasma feel
          c.strokeStyle = this.hsla(hue * 360, saturation, 0.85, Math.min(0.65, energyFlow * 0.5));
          c.lineWidth = beamWidth * 0.6;
          c.shadowColor = this.hsla(hue * 360, saturation, 0.7, 1);
          c.shadowBlur = beamGlow * 0.4;
          c.beginPath();
          c.moveTo(p1.x, p1.y);
          c.quadraticCurveTo(bezCpX, bezCpY, p2.x, p2.y);
          c.stroke();
          c.setLineDash([]);
          c.restore();
        }

        // === Traveling energy pulses (discrete bright "packets") ===
        if (energyPulses > 0 && energyFlow > 0.01) {
          c.shadowBlur = 0;
          for (let pi = 0; pi < energyPulses; pi++) {
            // Alternate direction: even pulses go p1→p2, odd go p2→p1
            const dir = (pi % 2 === 0) ? 1 : -1;
            const phaseOffset = pi / energyPulses;
            // Each pulse position cycles 0..1 along the beam
            let tp = (ctx.time * energySpeed * 0.5 * dir + phaseOffset) % 1;
            if (tp < 0) tp += 1;

            // Evaluate quadratic bezier at tp
            const mt = 1 - tp;
            const bx = mt * mt * p1.x + 2 * mt * tp * bezCpX + tp * tp * p2.x;
            const by = mt * mt * p1.y + 2 * mt * tp * bezCpY + tp * tp * p2.y;

            // Pulse grows brighter in the middle of travel (fades at ends)
            const envelope = Math.sin(tp * Math.PI);
            const intensity = envelope * Math.min(1, energyFlow);
            const pulseR = beamWidth * (1.2 + intensity * 1.8);

            // Glow layer
            const pulseColor = this.hsla(hue * 360, saturation, 0.85, intensity);
            const pulseGlow = this.hsla(hue * 360, saturation, 0.6, intensity * 0.5);
            c.shadowColor = pulseColor;
            c.shadowBlur = 10 + intensity * 20;

            c.fillStyle = pulseGlow;
            c.beginPath();
            c.arc(bx, by, pulseR * 2.5, 0, Math.PI * 2);
            c.fill();

            // Bright core
            c.fillStyle = `rgba(255, 255, 255, ${intensity * 0.9})`;
            c.shadowBlur = 6;
            c.beginPath();
            c.arc(bx, by, pulseR, 0, Math.PI * 2);
            c.fill();
          }
          c.shadowBlur = 0;
        }

        // Suppress unused warning
        void beamLen;
      }
    }

    // Reset shadow
    c.shadowBlur = 0;

    // Upload to GL and draw
    this.uploadAndBlit(gl);
  }

  private drawOrb(
    c: CanvasRenderingContext2D,
    cx: number, cy: number, r: number, intensity: number,
    hue: number, orbGlow: number, saturation: number,
  ): void {
    const glowR = orbGlow * (0.7 + intensity * 0.8);
    const alphaBoost = Math.min(1, 0.3 + intensity * 0.5);

    const grad = c.createRadialGradient(cx, cy, 0, cx, cy, r + glowR);
    grad.addColorStop(0, this.hsla(hue * 360, saturation, 0.95, 1));
    grad.addColorStop(0.12, this.hsla(hue * 360, saturation, 0.75, alphaBoost));
    grad.addColorStop(0.35, this.hsla(((hue + 0.1) % 1) * 360, saturation, 0.55, alphaBoost * 0.6));
    grad.addColorStop(0.7, this.hsla(((hue + 0.2) % 1) * 360, saturation, 0.4, alphaBoost * 0.2));
    grad.addColorStop(1, this.hsla(((hue + 0.3) % 1) * 360, saturation, 0.3, 0));

    c.shadowBlur = 0;
    c.globalCompositeOperation = 'lighter';
    c.fillStyle = grad;
    c.beginPath();
    c.arc(cx, cy, r + glowR, 0, Math.PI * 2);
    c.fill();

    // Bright core
    const coreR = r * (0.45 + intensity * 0.15);
    const coreGrad = c.createRadialGradient(cx, cy, 0, cx, cy, coreR);
    coreGrad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, 0.8 + intensity * 0.2)})`);
    coreGrad.addColorStop(0.5, this.hsla(hue * 360, saturation * 0.5, 0.95, 0.8));
    coreGrad.addColorStop(1, this.hsla(hue * 360, saturation, 0.6, 0));
    c.fillStyle = coreGrad;
    c.beginPath();
    c.arc(cx, cy, coreR, 0, Math.PI * 2);
    c.fill();

    c.globalCompositeOperation = 'source-over';
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
