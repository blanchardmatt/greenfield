import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { BaseEffect } from './BaseEffect';
import vertSrc from '../shaders/common/fullscreen-quad.vert?raw';
import fragSrc from '../shaders/voronoi/voronoi.frag?raw';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'voronoi-liquid',
  name: 'Voronoi Liquid',
  description: 'Organic flowing cellular patterns with domain warping',
  parameters: [
    { id: 'cellScale', type: 'float', label: 'Cell Scale', min: 1, max: 12, step: 0.1, default: 4.0, group: 'Shape' },
    { id: 'warpStrength', type: 'float', label: 'Warp', min: 0, max: 2, step: 0.01, default: 0.6, group: 'Shape' },
    { id: 'animSpeed', type: 'float', label: 'Speed', min: 0, max: 3, step: 0.01, default: 0.8, group: 'Motion' },
    { id: 'edgeWidth', type: 'float', label: 'Edge Width', min: 0.01, max: 0.5, step: 0.01, default: 0.12, group: 'Shape' },
    { id: 'innerDetail', type: 'float', label: 'Inner Detail', min: 0, max: 1, step: 0.01, default: 0.4, group: 'Shape' },
    { id: 'colorSpeed', type: 'float', label: 'Color Speed', min: 0, max: 3, step: 0.01, default: 0.5, group: 'Color' },
    { id: 'colorSaturation', type: 'float', label: 'Saturation', min: 0, max: 1, step: 0.01, default: 0.75, group: 'Color' },
    { id: 'brightness', type: 'float', label: 'Brightness', min: 0.2, max: 2, step: 0.01, default: 1.0, group: 'Color' },
    { id: 'mouseInfluence', type: 'float', label: 'Mouse Influence', min: 0, max: 3, step: 0.01, default: 1.0, group: 'Interaction' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class VoronoiLiquid extends BaseEffect {
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
    s.setFloat('u_cellScale', params.cellScale as number);
    s.setFloat('u_warpStrength', params.warpStrength as number);
    s.setFloat('u_animSpeed', params.animSpeed as number);
    s.setFloat('u_edgeWidth', params.edgeWidth as number);
    s.setFloat('u_innerDetail', params.innerDetail as number);
    s.setFloat('u_colorSpeed', params.colorSpeed as number);
    s.setFloat('u_colorSaturation', params.colorSaturation as number);
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
