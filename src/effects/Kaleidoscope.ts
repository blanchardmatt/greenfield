import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { BaseEffect } from './BaseEffect';
import vertSrc from '../shaders/common/fullscreen-quad.vert?raw';
import fragSrc from '../shaders/kaleidoscope/kaleidoscope.frag?raw';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'kaleidoscope',
  name: 'Kaleidoscope',
  description: 'Symmetrical kaleidoscope with multiple pattern generators',
  parameters: [
    { id: 'segments', type: 'int', label: 'Segments', min: 2, max: 24, default: 8, group: 'Shape' },
    { id: 'rotation', type: 'float', label: 'Rotation', min: -2, max: 2, step: 0.01, default: 0.3, group: 'Shape' },
    { id: 'zoom', type: 'float', label: 'Zoom', min: 0.2, max: 5, step: 0.01, default: 1.5, group: 'Shape' },
    { id: 'spiralAmount', type: 'float', label: 'Spiral', min: -5, max: 5, step: 0.01, default: 0.5, group: 'Shape' },
    { id: 'patternType', type: 'enum', label: 'Pattern', options: [
      { value: '0', label: 'Plasma' },
      { value: '1', label: 'Electric Rings' },
      { value: '2', label: 'Cellular' },
    ], default: '0', group: 'Pattern' },
    { id: 'patternSpeed', type: 'float', label: 'Speed', min: 0, max: 3, step: 0.01, default: 0.8, group: 'Pattern' },
    { id: 'colorCycle', type: 'float', label: 'Color Cycle', min: 0, max: 5, step: 0.01, default: 1.0, group: 'Color' },
    { id: 'brightness', type: 'float', label: 'Brightness', min: 0.2, max: 2, step: 0.01, default: 1.0, group: 'Color' },
    { id: 'mouseInfluence', type: 'float', label: 'Mouse Influence', min: 0, max: 2, step: 0.01, default: 0.5, group: 'Interaction' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class Kaleidoscope extends BaseEffect {
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
    s.setInt('u_segments', params.segments as number);
    s.setFloat('u_rotation', params.rotation as number);
    s.setFloat('u_zoom', params.zoom as number);
    s.setFloat('u_spiralAmount', params.spiralAmount as number);
    s.setInt('u_patternType', parseInt(params.patternType as string, 10));
    s.setFloat('u_patternSpeed', params.patternSpeed as number);
    s.setFloat('u_colorCycle', params.colorCycle as number);
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
