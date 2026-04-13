import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { BaseEffect } from './BaseEffect';
import vertSrc from '../shaders/common/fullscreen-quad.vert?raw';
import fragSrc from '../shaders/metaballs/metaballs.frag?raw';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'raymarched-metaballs',
  name: 'Raymarched Metaballs',
  description: '3D soft bodies with smooth blending, lighting, and fresnel',
  parameters: [
    { id: 'blobCount', type: 'int', label: 'Blob Count', min: 2, max: 8, default: 5, group: 'Shape' },
    { id: 'smoothBlend', type: 'float', label: 'Smooth Blend', min: 0.1, max: 3, step: 0.01, default: 1.0, group: 'Shape' },
    { id: 'roughness', type: 'float', label: 'Roughness', min: 0, max: 1, step: 0.01, default: 0.2, group: 'Surface' },
    { id: 'specularPower', type: 'float', label: 'Specular', min: 4, max: 128, step: 1, default: 32, group: 'Lighting' },
    { id: 'fresnelStrength', type: 'float', label: 'Fresnel', min: 0, max: 2, step: 0.01, default: 0.6, group: 'Lighting' },
    { id: 'ambientOcclusion', type: 'float', label: 'AO Strength', min: 0, max: 2, step: 0.01, default: 1.0, group: 'Lighting' },
    { id: 'envReflect', type: 'float', label: 'Env Reflect', min: 0, max: 1, step: 0.01, default: 0.3, group: 'Lighting' },
    { id: 'animSpeed', type: 'float', label: 'Speed', min: 0, max: 3, step: 0.01, default: 0.8, group: 'Motion' },
    { id: 'baseColor', type: 'color', label: 'Base Color', default: [0.2, 0.5, 0.9, 1.0], group: 'Color' },
    { id: 'specColor', type: 'color', label: 'Specular Color', default: [1.0, 0.95, 0.8, 1.0], group: 'Color' },
    { id: 'mouseInfluence', type: 'float', label: 'Mouse Influence', min: 0, max: 2, step: 0.01, default: 1.0, group: 'Interaction' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class RaymarchedMetaballs extends BaseEffect {
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
    s.setInt('u_blobCount', params.blobCount as number);
    s.setFloat('u_smoothBlend', params.smoothBlend as number);
    s.setFloat('u_roughness', params.roughness as number);
    s.setFloat('u_specularPower', params.specularPower as number);
    s.setFloat('u_fresnelStrength', params.fresnelStrength as number);
    s.setFloat('u_ambientOcclusion', params.ambientOcclusion as number);
    s.setFloat('u_envReflect', params.envReflect as number);
    s.setFloat('u_animSpeed', params.animSpeed as number);
    s.setFloat('u_mouseInfluence', params.mouseInfluence as number);

    const bc = params.baseColor as [number, number, number, number];
    s.setVec4('u_baseColor', bc[0], bc[1], bc[2], bc[3]);
    const sc = params.specColor as [number, number, number, number];
    s.setVec4('u_specColor', sc[0], sc[1], sc[2], sc[3]);

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
