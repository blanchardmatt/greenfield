// ──────────────────────────────────────────────
// Parameter System
// ──────────────────────────────────────────────

export type ParameterType = 'float' | 'int' | 'bool' | 'color' | 'enum' | 'vec2' | 'string' | 'action';

export interface ParameterDefBase {
  id: string;
  label: string;
  group?: string;
}

export interface FloatParameterDef extends ParameterDefBase {
  type: 'float';
  min: number;
  max: number;
  step?: number;
  default: number;
}

export interface IntParameterDef extends ParameterDefBase {
  type: 'int';
  min: number;
  max: number;
  default: number;
}

export interface BoolParameterDef extends ParameterDefBase {
  type: 'bool';
  default: boolean;
}

export interface ColorParameterDef extends ParameterDefBase {
  type: 'color';
  default: [number, number, number, number]; // RGBA 0-1
}

export interface EnumParameterDef extends ParameterDefBase {
  type: 'enum';
  options: { value: string; label: string }[];
  default: string;
}

export interface Vec2ParameterDef extends ParameterDefBase {
  type: 'vec2';
  min: [number, number];
  max: [number, number];
  default: [number, number];
}

export interface StringParameterDef extends ParameterDefBase {
  type: 'string';
  default: string;
  multiline?: boolean;
  placeholder?: string;
}

/** Action params don't store data — they trigger an event when clicked.
 *  Effects subscribe via `EffectActions.on(effectId, actionId, handler)`. */
export interface ActionParameterDef extends ParameterDefBase {
  type: 'action';
  default: 0;
  buttonLabel: string;
  actionId: string;
}

export type ParameterDef =
  | FloatParameterDef
  | IntParameterDef
  | BoolParameterDef
  | ColorParameterDef
  | EnumParameterDef
  | Vec2ParameterDef
  | StringParameterDef
  | ActionParameterDef;

export type ParameterValue =
  | number
  | boolean
  | string
  | [number, number, number, number]
  | [number, number];

export type ParameterValues = Record<string, ParameterValue>;

// ──────────────────────────────────────────────
// Input State
// ──────────────────────────────────────────────

export interface InputState {
  mouse: {
    x: number;       // normalized 0-1
    y: number;       // normalized 0-1
    px: number;      // pixel x
    py: number;      // pixel y
    down: boolean;
    button: number;
    dx: number;      // delta since last frame
    dy: number;
  };
  keys: Set<string>;
  touches: Array<{ id: number; x: number; y: number }>;
  audioFFT?: Float32Array;
  midiCC?: Map<number, number>;
}

// ──────────────────────────────────────────────
// Frame Context
// ──────────────────────────────────────────────

export interface FrameContext {
  gl: WebGL2RenderingContext;
  time: number;
  deltaTime: number;
  frameCount: number;
  resolution: [number, number];
  input: Readonly<InputState>;
}

// ──────────────────────────────────────────────
// Effect Node
// ──────────────────────────────────────────────

export interface PortDescriptor {
  id: string;
  label: string;
  type: 'texture' | 'float' | 'vec2';
}

export interface EffectNodeDescriptor {
  id: string;
  name: string;
  description: string;
  parameters: readonly ParameterDef[];
  inputs: readonly PortDescriptor[];
  outputs: readonly PortDescriptor[];
}

export interface EffectNode {
  readonly descriptor: EffectNodeDescriptor;
  init(gl: WebGL2RenderingContext): void;
  render(
    ctx: FrameContext,
    params: ParameterValues,
    inputTextures: Map<string, WebGLTexture>,
  ): void;
  resize(width: number, height: number): void;
  dispose(): void;
  getOutputTexture(portId?: string): WebGLTexture | null;
}

// ──────────────────────────────────────────────
// Pipeline
// ──────────────────────────────────────────────

export interface Pipeline {
  chain: string[];
  parameterOverrides: Record<string, ParameterValues>;
}

// ──────────────────────────────────────────────
// Preset
// ──────────────────────────────────────────────

export interface Preset {
  version: number;
  name: string;
  createdAt: string;
  pipeline: Pipeline;
}
