import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'organic-vines',
  name: 'Ornamental Flourish',
  description: 'Endlessly growing decorative scrollwork with leaves, flowers, and color layering',
  parameters: [
    { id: 'growSpeed', type: 'float', label: 'Grow Speed', min: 0.5, max: 8, step: 0.1, default: 3.0, group: 'Growth' },
    { id: 'curliness', type: 'float', label: 'Curl Tightness', min: 0.02, max: 0.15, step: 0.001, default: 0.06, group: 'Shape' },
    { id: 'thickness', type: 'float', label: 'Stroke Weight', min: 1, max: 6, step: 0.1, default: 2.5, group: 'Shape' },
    { id: 'branchChance', type: 'float', label: 'Branch Chance', min: 0, max: 0.08, step: 0.001, default: 0.025, group: 'Shape' },
    { id: 'dotSize', type: 'float', label: 'Dot Size', min: 0, max: 6, step: 0.1, default: 2.5, group: 'Ornaments' },
    { id: 'leafChance', type: 'float', label: 'Leaf Chance', min: 0, max: 0.2, step: 0.001, default: 0.08, group: 'Ornaments' },
    { id: 'flowerChance', type: 'float', label: 'Flower Chance', min: 0, max: 0.1, step: 0.001, default: 0.025, group: 'Ornaments' },
    { id: 'flowerSize', type: 'float', label: 'Flower Size', min: 4, max: 40, step: 0.5, default: 16, group: 'Ornaments' },
    { id: 'palette', type: 'enum', label: 'Palette', options: [
      { value: 'mono-dark', label: 'Monochrome (dark)' },
      { value: 'mono-light', label: 'Monochrome (light)' },
      { value: 'rainbow', label: 'Rainbow Layers' },
      { value: 'subtle', label: 'Subtle / Pastel' },
      { value: 'warm', label: 'Warm (sunset)' },
      { value: 'cool', label: 'Cool (ocean)' },
      { value: 'earth', label: 'Earth (botanical)' },
      { value: 'neon', label: 'Neon' },
      { value: 'random', label: 'Random (changes)' },
    ], default: 'mono-dark', group: 'Style' },
    { id: 'paletteChangeRate', type: 'float', label: 'Color Shift Rate', min: 0, max: 5, step: 0.05, default: 1.0, group: 'Style' },
    { id: 'transparentBg', type: 'bool', label: 'Transparent BG', default: false, group: 'Style' },
    { id: 'lightSeeking', type: 'float', label: 'Seek Empty Space', min: 0, max: 2, step: 0.01, default: 0.8, group: 'Behavior' },
    { id: 'mouseAttract', type: 'float', label: 'Seek Mouse', min: 0, max: 2, step: 0.01, default: 0.6, group: 'Behavior' },
    { id: 'mouseInfluence', type: 'float', label: 'Touch Bend', min: 0, max: 1, step: 0.01, default: 0.3, group: 'Behavior' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

interface Vine {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  angle: number;
  curvature: number;
  curvatureAccel: number;
  thickness: number;
  life: number;
  maxLife: number;
  seed: number;
  stepsSinceLastDot: number;
  stepsSinceLastLeaf: number;
  totalSteps: number;
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
  private canvas2d: OffscreenCanvas | HTMLCanvasElement | null = null;
  private ctx2d: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D | null = null;
  private texture: WebGLTexture | null = null;
  private outputTexture: WebGLTexture | null = null;
  private w = 0;
  private h = 0;

  // Vine state
  private vines: Vine[] = [];
  private hueRotation = 0;
  private currentColor = '#000000';
  private bgColor = '#ffffff';
  private veinColor = 'rgba(0,0,0,0.6)';
  private randomPalette: string | null = null;
  private lastRandomGen = -1;
  private pixelsCovered = 0;
  private generationCount = 0;
  private lastSpawnTime = 0;

  // Density grid for light-seeking behavior (coarse grid tracks vine coverage)
  private readonly gridRes = 40;
  private densityGrid: Float32Array = new Float32Array(this.gridRes * this.gridRes);
  private gridCellW = 0;
  private gridCellH = 0;

  init(gl: WebGL2RenderingContext): void {
    this.gl = gl;
    this.texture = gl.createTexture()!;
  }

  resize(width: number, height: number): void {
    this.w = width;
    this.h = height;
    this.gridCellW = width / this.gridRes;
    this.gridCellH = height / this.gridRes;

    // Create 2D canvas for drawing vines (OffscreenCanvas with fallback)
    if (typeof OffscreenCanvas !== 'undefined') {
      this.canvas2d = new OffscreenCanvas(width, height);
    } else {
      const el = document.createElement('canvas');
      el.width = width;
      el.height = height;
      this.canvas2d = el;
    }
    this.ctx2d = this.canvas2d.getContext('2d')! as CanvasRenderingContext2D;

    // Clear density grid and canvas
    this.densityGrid.fill(0);
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
    // Canvas is ALWAYS cleared to transparent. Background color is applied
    // at blit time via the shader (so toggling transparentBg doesn't lose progress).
    this.ctx2d!.clearRect(0, 0, this.w, this.h);
    this.pixelsCovered = 0;
    this.densityGrid.fill(0);
  }

  /** Sample density at a world-space point, with bilinear smoothing */
  private sampleDensity(x: number, y: number): number {
    const gx = Math.max(0, Math.min(this.gridRes - 1, Math.floor(x / this.gridCellW)));
    const gy = Math.max(0, Math.min(this.gridRes - 1, Math.floor(y / this.gridCellH)));
    return this.densityGrid[gy * this.gridRes + gx]!;
  }

  /** Add to density grid at a world-space point */
  private depositDensity(x: number, y: number, amount: number): void {
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return;
    const gx = Math.floor(x / this.gridCellW);
    const gy = Math.floor(y / this.gridCellH);
    const idx = gy * this.gridRes + gx;
    this.densityGrid[idx] = Math.min(10, this.densityGrid[idx]! + amount);
  }

  /** Find the angle that points toward the most empty space */
  private findOpenAngle(x: number, y: number, currentAngle: number, lookDist: number): number {
    // Sample 7 candidate directions within ~120 degrees of current angle
    let bestAngle = currentAngle;
    let bestScore = Infinity;
    const spread = Math.PI * 0.66;
    const samples = 7;
    for (let i = 0; i < samples; i++) {
      const offset = ((i / (samples - 1)) - 0.5) * spread;
      const a = currentAngle + offset;
      const sx = x + Math.cos(a) * lookDist;
      const sy = y + Math.sin(a) * lookDist;
      // Penalty for going out of bounds
      let score = this.sampleDensity(sx, sy);
      if (sx < 0 || sx >= this.w || sy < 0 || sy >= this.h) {
        score += 5;
      }
      // Small bias to favor forward direction (stability)
      score += Math.abs(offset) * 0.1;
      if (score < bestScore) {
        bestScore = score;
        bestAngle = a;
      }
    }
    return bestAngle;
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
      const life = 80 + Math.random() * 120;
      this.vines.push({
        x, y, prevX: x, prevY: y, angle,
        curvature: 0,
        curvatureAccel: (Math.random() > 0.5 ? 1 : -1) * (0.015 + Math.random() * 0.03),
        thickness: 3 + Math.random() * 2.5,
        life, maxLife: life,
        seed: Math.random() * 1000,
        stepsSinceLastDot: 0,
        stepsSinceLastLeaf: 0,
        totalSteps: 0,
      });
    }
  }

  private updateColors(palette: string, transparentBg: boolean): void {
    // If "random", resolve to a current random palette (stored in activePalette)
    let effective = palette;
    if (palette === 'random') {
      if (!this.randomPalette || this.generationCount !== this.lastRandomGen) {
        const options = ['mono-dark', 'mono-light', 'rainbow', 'subtle', 'warm', 'cool', 'earth', 'neon'];
        this.randomPalette = options[Math.floor(Math.random() * options.length)]!;
        this.lastRandomGen = this.generationCount;
      }
      effective = this.randomPalette;
    }

    // Background color
    if (transparentBg) {
      this.bgColor = 'rgba(0,0,0,0)';
    } else if (effective === 'mono-light' || effective === 'subtle' || effective === 'earth') {
      this.bgColor = '#ffffff';
    } else {
      this.bgColor = effective === 'neon' ? '#0a0012' : '#000000';
    }

    // Foreground color based on palette and generation
    const g = this.generationCount;
    const h = (this.hueRotation % 360 + 360) % 360;

    let rgb: [number, number, number];

    switch (effective) {
      case 'mono-dark':
        rgb = g === 0 ? [1, 1, 1] : hsl(h, 0.05, 0.95);
        break;
      case 'mono-light':
        rgb = g === 0 ? [0, 0, 0] : hsl(h, 0.05, 0.15);
        break;
      case 'rainbow':
        rgb = g === 0 ? [0.95, 0.95, 0.95] : hsl(h, 0.75, 0.6);
        break;
      case 'subtle':
        rgb = hsl(h, 0.25, 0.4 + g * 0.02);
        break;
      case 'warm': {
        const warmH = (h * 0.2) % 60;
        rgb = hsl(warmH, 0.7, g === 0 ? 0.35 : 0.55);
        break;
      }
      case 'cool': {
        const coolH = 160 + ((h * 0.3) % 100);
        rgb = hsl(coolH, 0.6, g === 0 ? 0.3 : 0.55);
        break;
      }
      case 'earth': {
        const earthH = 30 + ((h * 0.4) % 100);
        rgb = hsl(earthH, 0.45, 0.3 + g * 0.05);
        break;
      }
      case 'neon':
        rgb = hsl(h, 1.0, 0.6);
        break;
      default:
        rgb = [1, 1, 1];
    }

    const [r, gc, b] = rgb;
    this.currentColor = `rgb(${Math.round(r * 255)},${Math.round(gc * 255)},${Math.round(b * 255)})`;

    const isLightBg = effective === 'mono-light' || effective === 'subtle' || effective === 'earth';
    this.veinColor = isLightBg ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)';
  }

  private drawLeaf(
    c: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    x: number, y: number, angle: number, length: number,
  ): void {
    const tipX = x + Math.cos(angle) * length;
    const tipY = y + Math.sin(angle) * length;
    const perpAngle = angle + Math.PI * 0.5;
    const leafWidth = length * (0.22 + Math.random() * 0.12);
    // Offset the control points toward the tip for a more natural leaf shape
    const bulge = 0.45;
    const mid1X = x + Math.cos(angle) * length * bulge + Math.cos(perpAngle) * leafWidth;
    const mid1Y = y + Math.sin(angle) * length * bulge + Math.sin(perpAngle) * leafWidth;
    const mid2X = x + Math.cos(angle) * length * bulge - Math.cos(perpAngle) * leafWidth;
    const mid2Y = y + Math.sin(angle) * length * bulge - Math.sin(perpAngle) * leafWidth;

    c.fillStyle = this.currentColor;
    c.beginPath();
    c.moveTo(x, y);
    c.quadraticCurveTo(mid1X, mid1Y, tipX, tipY);
    c.quadraticCurveTo(mid2X, mid2Y, x, y);
    c.fill();

    // Leaf vein
    c.strokeStyle = this.veinColor;
    c.lineWidth = 0.7;
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(tipX, tipY);
    c.stroke();
  }

  private drawFlower(
    c: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    cx: number, cy: number, size: number, rotation: number,
  ): void {
    const petalCount = 5 + Math.floor(Math.random() * 4); // 5-8 petals
    const petalLength = size;
    const petalWidth = size * 0.45;
    const twoPi = Math.PI * 2;

    c.fillStyle = this.currentColor;

    // Petals
    for (let i = 0; i < petalCount; i++) {
      const a = rotation + (i / petalCount) * twoPi;
      const tipX = cx + Math.cos(a) * petalLength;
      const tipY = cy + Math.sin(a) * petalLength;
      const perpA = a + Math.PI * 0.5;
      const mid1X = cx + Math.cos(a) * petalLength * 0.5 + Math.cos(perpA) * petalWidth;
      const mid1Y = cy + Math.sin(a) * petalLength * 0.5 + Math.sin(perpA) * petalWidth;
      const mid2X = cx + Math.cos(a) * petalLength * 0.5 - Math.cos(perpA) * petalWidth;
      const mid2Y = cy + Math.sin(a) * petalLength * 0.5 - Math.sin(perpA) * petalWidth;

      c.beginPath();
      c.moveTo(cx, cy);
      c.quadraticCurveTo(mid1X, mid1Y, tipX, tipY);
      c.quadraticCurveTo(mid2X, mid2Y, cx, cy);
      c.fill();
    }

    // Center disc (vein color for contrast — works on any bg)
    c.fillStyle = this.veinColor;
    c.beginPath();
    c.arc(cx, cy, size * 0.22, 0, twoPi);
    c.fill();

    // Center dot (fg color)
    c.fillStyle = this.currentColor;
    c.beginPath();
    c.arc(cx, cy, size * 0.1, 0, twoPi);
    c.fill();

    // Small decorative dots around the center (stamen)
    const stamenCount = 6;
    for (let i = 0; i < stamenCount; i++) {
      const a = rotation + (i / stamenCount) * twoPi + Math.PI / stamenCount;
      const sx = cx + Math.cos(a) * size * 0.17;
      const sy = cy + Math.sin(a) * size * 0.17;
      c.beginPath();
      c.arc(sx, sy, size * 0.035, 0, twoPi);
      c.fill();
    }
  }

  render(
    ctx: FrameContext,
    params: ParameterValues,
    inputTextures: Map<string, WebGLTexture>,
  ): void {
    const gl = this.gl!;
    if (!this.ctx2d || !this.canvas2d) return;
    const inputTex = inputTextures.get('input0') ?? null;

    const c = this.ctx2d;
    const growSpeed = params.growSpeed as number;
    const curliness = params.curliness as number;
    const baseThickness = params.thickness as number;
    const branchChance = params.branchChance as number;
    const dotSize = params.dotSize as number;
    const leafChance = params.leafChance as number;
    const flowerChance = params.flowerChance as number;
    const flowerSize = params.flowerSize as number;
    const palette = params.palette as string;
    const paletteChangeRate = params.paletteChangeRate as number;
    const transparentBg = params.transparentBg as boolean;
    const mouseInf = params.mouseInfluence as number;
    const lightSeeking = params.lightSeeking as number;
    const mouseAttract = params.mouseAttract as number;

    this.updateColors(palette, transparentBg);

    // Steps per frame based on grow speed
    const steps = Math.floor(growSpeed);

    const mx = ctx.input.mouse.x * this.w;
    const my = (1 - ctx.input.mouse.y) * this.h;

    for (let s = 0; s < steps; s++) {
      const newVines: Vine[] = [];

      for (let vi = this.vines.length - 1; vi >= 0; vi--) {
        const v = this.vines[vi]!;
        if (v.life <= 0) {
          this.vines.splice(vi, 1);
          continue;
        }

        v.totalSteps++;

        // Curvature: accelerates → tighter spiral toward end of life
        const lifeRatio = v.life / v.maxLife;
        v.curvature += v.curvatureAccel * curliness * (1.0 + (1 - lifeRatio) * 2.0);
        v.curvature += Math.sin(v.seed + v.totalSteps * 0.08) * 0.003;
        v.angle += v.curvature;

        // Global mouse attraction (gentle, always on)
        const dmx = mx - v.x;
        const dmy = my - v.y;
        const mDist = Math.sqrt(dmx * dmx + dmy * dmy);
        if (mDist > 1 && mouseAttract > 0) {
          // Gentle global pull — stronger when farther from mouse, falls off as we get close
          const pullStrength = mouseAttract * 0.02 * Math.min(1, mDist / (this.w * 0.3));
          const ta = Math.atan2(dmy, dmx);
          let diff = ta - v.angle;
          diff = ((diff + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
          v.angle += diff * pullStrength;
        }

        // Close-range mouse bend (existing behavior — responds to touch)
        if (mDist > 1 && mouseInf > 0) {
          const pull = mouseInf * 0.12 * Math.exp(-mDist / (this.w * 0.2));
          const ta = Math.atan2(dmy, dmx);
          let diff = ta - v.angle;
          diff = ((diff + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
          v.angle += diff * pull;
        }

        // Light-seeking: steer toward empty space (sample every few steps for perf)
        if (lightSeeking > 0 && v.totalSteps % 3 === 0) {
          const lookDist = this.gridCellW * 2.5;
          const openAngle = this.findOpenAngle(v.x, v.y, v.angle, lookDist);
          let diff = openAngle - v.angle;
          diff = ((diff + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
          v.angle += diff * lightSeeking * 0.25;
        }

        // Segment length shrinks as vine dies (tighter spirals at tips)
        const segLen = (5 + v.thickness * 0.4) * (0.5 + lifeRatio * 0.5);
        const nx = v.x + Math.cos(v.angle) * segLen;
        const ny = v.y + Math.sin(v.angle) * segLen;

        // Tapered stroke
        const taperedThick = v.thickness * baseThickness * Math.pow(lifeRatio, 0.4);
        c.strokeStyle = this.currentColor;
        c.lineWidth = Math.max(taperedThick, 0.3);
        c.lineCap = 'round';
        c.lineJoin = 'round';

        // Draw smooth curve using quadratic bezier through prev → current → next
        const cpx = v.x;
        const cpy = v.y;
        c.beginPath();
        c.moveTo(v.prevX, v.prevY);
        c.quadraticCurveTo(cpx, cpy, nx, ny);
        c.stroke();

        // Deposit density in the grid along the segment
        this.depositDensity(v.x, v.y, 1.0);
        this.depositDensity((v.x + nx) * 0.5, (v.y + ny) * 0.5, 0.5);

        // Decorative dots on outside of curve
        v.stepsSinceLastDot++;
        if (dotSize > 0 && v.stepsSinceLastDot > 10 && lifeRatio > 0.2 && lifeRatio < 0.85) {
          v.stepsSinceLastDot = 0;
          const side = Math.sign(v.curvature) || 1;
          const dotAngle = v.angle + side * Math.PI * 0.5;
          const dotDist = taperedThick * 2 + dotSize * 1.5;
          const dx = v.x + Math.cos(dotAngle) * dotDist;
          const dy = v.y + Math.sin(dotAngle) * dotDist;
          c.fillStyle = this.currentColor;
          c.beginPath();
          c.arc(dx, dy, dotSize * 0.5 * lifeRatio, 0, Math.PI * 2);
          c.fill();

          // Trailing dots
          if (Math.random() < 0.35) {
            for (let j = 1; j <= 2; j++) {
              const r = dotSize * (0.3 - j * 0.08) * lifeRatio;
              if (r < 0.3) break;
              const tdx = dx + Math.cos(dotAngle) * j * dotSize * 1.5;
              const tdy = dy + Math.sin(dotAngle) * j * dotSize * 1.5;
              c.beginPath();
              c.arc(tdx, tdy, r, 0, Math.PI * 2);
              c.fill();
            }
          }
        }

        // Ornamental leaves — random chance
        v.stepsSinceLastLeaf++;
        if (leafChance > 0 && v.stepsSinceLastLeaf > 6 && Math.random() < leafChance && lifeRatio > 0.25 && lifeRatio < 0.92 && v.thickness > 1.2) {
          v.stepsSinceLastLeaf = 0;
          const side = Math.random() > 0.5 ? 1 : -1;
          const leafAngle = v.angle + side * (0.5 + Math.random() * 0.8);
          const leafLen = (10 + Math.random() * 16) * (0.5 + lifeRatio * 0.5);
          this.drawLeaf(c, v.x, v.y, leafAngle, leafLen);
        }

        // Procedural flowers — random bloom
        if (flowerChance > 0 && Math.random() < flowerChance && lifeRatio > 0.1 && lifeRatio < 0.85 && v.totalSteps > 4) {
          const fSize = flowerSize * (0.7 + Math.random() * 0.5) * (0.5 + lifeRatio * 0.5);
          this.drawFlower(c, v.x, v.y, fSize, Math.random() * Math.PI * 2);
          // Flowers cost some life (the vine "spends" energy blooming)
          v.life *= 0.92;
        }

        // Branch
        if (Math.random() < branchChance && v.life > 40 && v.thickness > 1.2) {
          const branchDir = Math.random() > 0.5 ? 1 : -1;
          const branchLife = v.life * (0.25 + Math.random() * 0.3);
          newVines.push({
            x: v.x, y: v.y, prevX: v.prevX, prevY: v.prevY,
            angle: v.angle + branchDir * (0.4 + Math.random() * 0.8),
            curvature: 0,
            curvatureAccel: -v.curvatureAccel * (0.4 + Math.random() * 0.6),
            thickness: v.thickness * (0.35 + Math.random() * 0.3),
            life: branchLife, maxLife: branchLife,
            seed: Math.random() * 1000,
            stepsSinceLastDot: 0,
            stepsSinceLastLeaf: 0,
            totalSteps: 0,
          });
        }

        v.prevX = v.x;
        v.prevY = v.y;
        v.x = nx;
        v.y = ny;
        v.life -= 1;
        v.thickness *= 0.998;
        this.pixelsCovered += segLen * taperedThick;
      }

      this.vines.push(...newVines);
    }

    // Spawn new vines periodically to keep growth going
    if (this.vines.length < 3 || ctx.time - this.lastSpawnTime > 4) {
      this.lastSpawnTime = ctx.time;
      this.spawnEdgeVines(2);
    }

    // When screen is covered enough → new color generation
    // Higher rate → shifts more often (lower threshold)
    // Rate 0 means never shift color (still refreshes composition on full coverage)
    const coverageRatio = this.pixelsCovered / (this.w * this.h);
    const shiftThreshold = paletteChangeRate > 0
      ? Math.max(0.03, 0.4 / paletteChangeRate)
      : 1.0;
    if (coverageRatio > shiftThreshold && this.vines.length < 5) {
      this.generationCount++;
      this.hueRotation += 60 + Math.random() * 60;
      this.updateColors(palette, transparentBg);
      this.pixelsCovered = 0;
      // Gently fade density so new generation still has reference but can grow over old
      for (let i = 0; i < this.densityGrid.length; i++) {
        this.densityGrid[i]! *= 0.3;
      }
      this.spawnEdgeVines(4);
    }

    // Passive density decay — encourages revisiting old areas eventually
    for (let i = 0; i < this.densityGrid.length; i++) {
      this.densityGrid[i]! *= 0.9995;
    }

    // Upload canvas to GL texture (flip Y so canvas top maps to screen top)
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas2d);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

    // Draw fullscreen quad with texture (composite over input if provided)
    gl.viewport(0, 0, this.w, this.h);
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);

    if (!this.blitProgram) this.initBlit(gl);
    gl.useProgram(this.blitProgram);

    // Unit 0: the vine canvas texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(this.blitTexLoc, 0);

    // Unit 1: the input texture from previous effect (if any)
    if (inputTex) {
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, inputTex);
      gl.uniform1i(this.blitInputLoc, 1);
      gl.uniform1i(this.blitHasInputLoc, 1);
    } else {
      gl.uniform1i(this.blitHasInputLoc, 0);
    }

    gl.uniform1i(this.blitTransparentLoc, transparentBg ? 1 : 0);
    const [br, bg2, bb] = this.bgColorRGB();
    gl.uniform3f(this.blitBgColorLoc, br, bg2, bb);

    gl.bindVertexArray(this.blitVAO);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindVertexArray(null);
  }

  // Minimal blit shader
  private blitProgram: WebGLProgram | null = null;
  private blitTexLoc: WebGLUniformLocation | null = null;
  private blitInputLoc: WebGLUniformLocation | null = null;
  private blitHasInputLoc: WebGLUniformLocation | null = null;
  private blitTransparentLoc: WebGLUniformLocation | null = null;
  private blitBgColorLoc: WebGLUniformLocation | null = null;
  private blitVAO: WebGLVertexArrayObject | null = null;

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
    uniform int uTransparent;
    uniform vec3 uBgColor;
    in vec2 vUv;
    out vec4 fragColor;
    void main() {
      // 'top' is the vine canvas (always transparent RGBA now)
      vec4 top = texture(uTex, vUv);
      // Source-over: result.rgb = top.rgb + backdrop.rgb * (1 - top.a)
      vec3 backdrop;
      if (uTransparent == 1 && uHasInput == 1) {
        // Composite over the previous effect
        backdrop = texture(uInput, vUv).rgb;
      } else {
        // Composite over a solid bg color (either the palette bg, or black if none)
        backdrop = uBgColor;
      }
      vec3 rgb = top.rgb + backdrop * (1.0 - top.a);
      // Output alpha: 1 if opaque mode, or preserve if transparent (for chaining)
      float alpha = (uTransparent == 1 && uHasInput == 0) ? top.a : 1.0;
      fragColor = vec4(rgb, alpha);
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
    this.blitTransparentLoc = gl.getUniformLocation(p, 'uTransparent');
    this.blitBgColorLoc = gl.getUniformLocation(p, 'uBgColor');
    this.blitVAO = gl.createVertexArray()!;
  }

  /** Parse the bgColor string into RGB floats (0-1) for the shader */
  private bgColorRGB(): [number, number, number] {
    const c = this.bgColor;
    if (c === 'rgba(0,0,0,0)') return [0, 0, 0];
    if (c.startsWith('#')) {
      const r = parseInt(c.slice(1, 3), 16) / 255;
      const g = parseInt(c.slice(3, 5), 16) / 255;
      const b = parseInt(c.slice(5, 7), 16) / 255;
      return [r, g, b];
    }
    return [0, 0, 0];
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
