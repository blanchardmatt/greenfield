import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { BaseEffect } from './BaseEffect';
import vertSrc from '../shaders/common/fullscreen-quad.vert?raw';
import fragSrc from '../shaders/domain-warp/domain-warp.frag?raw';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'domain-warp-tunnel',
  name: 'Domain Warp',
  description: 'Hypnotic recursive domain warping with geometric patterns',
  parameters: [
    { id: 'warpScale', type: 'float', label: 'Scale', min: 0.5, max: 5, step: 0.01, default: 1.5, group: 'Warp' },
    { id: 'warpStrength', type: 'float', label: 'Warp Strength', min: 0, max: 3, step: 0.01, default: 1.0, group: 'Warp' },
    { id: 'warpLayers', type: 'float', label: 'Warp Layers', min: 1, max: 5, step: 1, default: 3, group: 'Warp' },
    { id: 'speed', type: 'float', label: 'Speed', min: 0, max: 3, step: 0.01, default: 0.6, group: 'Motion' },
    { id: 'patternMode', type: 'enum', label: 'Pattern', options: [
      { value: '0', label: 'Lattice' },
      { value: '1', label: 'Ribbons' },
      { value: '2', label: 'Crystal' },
    ], default: '0', group: 'Pattern' },
    { id: 'patternScale', type: 'float', label: 'Pattern Scale', min: 1, max: 15, step: 0.1, default: 5.0, group: 'Pattern' },
    { id: 'contrast', type: 'float', label: 'Contrast', min: 0.2, max: 3, step: 0.01, default: 1.2, group: 'Color' },
    { id: 'colorShift', type: 'float', label: 'Color Shift', min: 0, max: 1, step: 0.01, default: 0.0, group: 'Color' },
    { id: 'glowAmount', type: 'float', label: 'Glow', min: 0, max: 2, step: 0.01, default: 0.5, group: 'Color' },
    { id: 'brightness', type: 'float', label: 'Brightness', min: 0.2, max: 2, step: 0.01, default: 1.0, group: 'Color' },
    { id: 'mouseInfluence', type: 'float', label: 'Mouse Influence', min: 0, max: 3, step: 0.01, default: 1.0, group: 'Interaction' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class DomainWarpTunnel extends BaseEffect {
  readonly descriptor = DESCRIPTOR;

  init(gl: WebGL2RenderingContext): void {
    this.gl = gl;
    this.shader = this.createShader(gl, vertSrc, fragSrc);
  }

  render(
    ctx: FrameContext,
    params: ParameterValues,
    inputTextures: Map<string, WebGLTexture>,
  ): void {
    const { gl, time, resolution, input } = ctx;
    const s = this.shader!;
    s.use();

    s.setFloat('u_time', time);
    s.setVec2('u_resolution', resolution[0], resolution[1]);
    s.setVec2('u_mouse', input.mouse.x, input.mouse.y);
    s.setFloat('u_warpScale', params.warpScale as number);
    s.setFloat('u_warpStrength', params.warpStrength as number);
    s.setFloat('u_warpLayers', params.warpLayers as number);
    s.setFloat('u_speed', params.speed as number);
    s.setInt('u_patternMode', parseInt(params.patternMode as string, 10));
    s.setFloat('u_patternScale', params.patternScale as number);
    s.setFloat('u_contrast', params.contrast as number);
    s.setFloat('u_colorShift', params.colorShift as number);
    s.setFloat('u_glowAmount', params.glowAmount as number);
    s.setFloat('u_brightness', params.brightness as number);
    s.setFloat('u_mouseInfluence', params.mouseInfluence as number);

    const inputTex = inputTextures.get('input0');
    if (inputTex) {
      s.setTexture('u_inputTexture', inputTex, 0);
      s.setInt('u_hasInput', 1);
    } else {
      s.setInt('u_hasInput', 0);
    }

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}
