import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { BaseEffect } from './BaseEffect';
import vertSrc from '../shaders/common/fullscreen-quad.vert?raw';
import fragSrc from '../shaders/vines/vines.frag?raw';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'organic-vines',
  name: 'Ornamental Flourish',
  description: 'Decorative filigree with spiraling scrollwork, leaves, and flowers',
  parameters: [
    { id: 'growSpeed', type: 'float', label: 'Grow Speed', min: 0.05, max: 2, step: 0.01, default: 0.3, group: 'Growth' },
    { id: 'density', type: 'float', label: 'Density', min: 0.1, max: 1.0, step: 0.01, default: 0.5, group: 'Growth' },
    { id: 'curliness', type: 'float', label: 'Curl Tightness', min: 0.3, max: 3, step: 0.01, default: 1.2, group: 'Shape' },
    { id: 'thickness', type: 'float', label: 'Stroke Weight', min: 0.3, max: 3, step: 0.01, default: 1.0, group: 'Shape' },
    { id: 'branchAngle', type: 'float', label: 'Branch Angle', min: 0.3, max: 2.5, step: 0.01, default: 1.2, group: 'Shape' },
    { id: 'leafSize', type: 'float', label: 'Leaf / Flower', min: 0, max: 2, step: 0.01, default: 1.0, group: 'Ornaments' },
    { id: 'invertColors', type: 'bool', label: 'White on Black', default: false, group: 'Style' },
    { id: 'mouseInfluence', type: 'float', label: 'Mouse Influence', min: 0, max: 3, step: 0.01, default: 0.5, group: 'Interaction' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class OrganicVines extends BaseEffect {
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
    s.setFloat('u_growSpeed', params.growSpeed as number);
    s.setFloat('u_density', params.density as number);
    s.setFloat('u_curliness', params.curliness as number);
    s.setFloat('u_thickness', params.thickness as number);
    s.setFloat('u_branchAngle', params.branchAngle as number);
    s.setFloat('u_leafSize', params.leafSize as number);
    s.setFloat('u_mouseInfluence', params.mouseInfluence as number);
    s.setInt('u_invertColors', (params.invertColors as boolean) ? 1 : 0);

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
