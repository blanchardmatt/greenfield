import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { BaseEffect } from './BaseEffect';
import vertSrc from '../shaders/common/fullscreen-quad.vert?raw';
import fragSrc from '../shaders/noise-flow/flow.frag?raw';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'noise-flow-field',
  name: 'Noise Flow Field',
  description: 'Simplex noise driven flow field with configurable turbulence',
  parameters: [
    { id: 'speed', type: 'float', label: 'Flow Speed', min: 0, max: 5, step: 0.01, default: 0.8, group: 'Motion' },
    { id: 'scale', type: 'float', label: 'Noise Scale', min: 0.1, max: 20, step: 0.1, default: 4.0, group: 'Shape' },
    { id: 'octaves', type: 'int', label: 'Octaves', min: 1, max: 8, default: 4, group: 'Shape' },
    { id: 'lacunarity', type: 'float', label: 'Lacunarity', min: 1.0, max: 4.0, step: 0.01, default: 2.0, group: 'Shape' },
    { id: 'gain', type: 'float', label: 'Gain', min: 0.1, max: 1.0, step: 0.01, default: 0.5, group: 'Shape' },
    { id: 'distortion', type: 'float', label: 'Distortion', min: 0, max: 5, step: 0.01, default: 1.5, group: 'Shape' },
    { id: 'brightness', type: 'float', label: 'Brightness', min: 0.1, max: 3.0, step: 0.01, default: 1.2, group: 'Color' },
    { id: 'color1', type: 'color', label: 'Color A', default: [0.05, 0.1, 0.35, 1.0], group: 'Color' },
    { id: 'color2', type: 'color', label: 'Color B', default: [0.95, 0.4, 0.1, 1.0], group: 'Color' },
    { id: 'mouseInfluence', type: 'float', label: 'Mouse Influence', min: 0, max: 2, step: 0.01, default: 0.5, group: 'Interaction' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class NoiseFlowField extends BaseEffect {
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
    s.setFloat('u_speed', params.speed as number);
    s.setFloat('u_scale', params.scale as number);
    s.setInt('u_octaves', params.octaves as number);
    s.setFloat('u_lacunarity', params.lacunarity as number);
    s.setFloat('u_gain', params.gain as number);
    s.setFloat('u_distortion', params.distortion as number);
    s.setFloat('u_brightness', params.brightness as number);
    s.setFloat('u_mouseInfluence', params.mouseInfluence as number);

    const c1 = params.color1 as [number, number, number, number];
    s.setVec4('u_color1', c1[0], c1[1], c1[2], c1[3]);
    const c2 = params.color2 as [number, number, number, number];
    s.setVec4('u_color2', c2[0], c2[1], c2[2], c2[3]);

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
