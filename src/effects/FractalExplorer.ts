import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { BaseEffect } from './BaseEffect';
import vertSrc from '../shaders/common/fullscreen-quad.vert?raw';
import fragSrc from '../shaders/fractal/mandelbrot.frag?raw';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'fractal-explorer',
  name: 'Fractal Explorer',
  description: 'Interactive Mandelbrot and Julia set explorer',
  parameters: [
    { id: 'zoom', type: 'float', label: 'Zoom', min: 0.1, max: 1000, step: 0.1, default: 1.0, group: 'View' },
    { id: 'centerX', type: 'float', label: 'Center X', min: -3, max: 3, step: 0.001, default: -0.5, group: 'View' },
    { id: 'centerY', type: 'float', label: 'Center Y', min: -3, max: 3, step: 0.001, default: 0.0, group: 'View' },
    { id: 'maxIterations', type: 'int', label: 'Max Iterations', min: 10, max: 1000, default: 200, group: 'Quality' },
    { id: 'escapeRadius', type: 'float', label: 'Escape Radius', min: 2, max: 100, step: 0.1, default: 4.0, group: 'Quality' },
    { id: 'power', type: 'float', label: 'Power', min: 2, max: 8, step: 0.1, default: 2.0, group: 'Shape' },
    { id: 'juliaMode', type: 'bool', label: 'Julia Mode', default: false, group: 'Shape' },
    { id: 'juliaCx', type: 'float', label: 'Julia C.x', min: -2, max: 2, step: 0.001, default: -0.7, group: 'Shape' },
    { id: 'juliaCy', type: 'float', label: 'Julia C.y', min: -2, max: 2, step: 0.001, default: 0.27015, group: 'Shape' },
    { id: 'colorSpeed', type: 'float', label: 'Color Speed', min: 0.1, max: 20, step: 0.1, default: 3.0, group: 'Color' },
    { id: 'colorOffset', type: 'float', label: 'Color Offset', min: 0, max: 1, step: 0.01, default: 0.0, group: 'Color' },
    { id: 'innerColor', type: 'color', label: 'Inner Color', default: [0.0, 0.0, 0.0, 1.0], group: 'Color' },
    { id: 'mouseInfluence', type: 'float', label: 'Mouse Influence', min: 0, max: 2, step: 0.01, default: 0.3, group: 'Interaction' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class FractalExplorer extends BaseEffect {
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
    s.setFloat('u_zoom', params.zoom as number);
    s.setVec2('u_center', params.centerX as number, params.centerY as number);
    s.setInt('u_maxIterations', params.maxIterations as number);
    s.setFloat('u_escapeRadius', params.escapeRadius as number);
    s.setFloat('u_power', params.power as number);
    s.setInt('u_juliaMode', (params.juliaMode as boolean) ? 1 : 0);
    s.setVec2('u_juliaC', params.juliaCx as number, params.juliaCy as number);
    s.setFloat('u_colorSpeed', params.colorSpeed as number);
    s.setFloat('u_colorOffset', params.colorOffset as number);
    s.setFloat('u_mouseInfluence', params.mouseInfluence as number);

    const ic = params.innerColor as [number, number, number, number];
    s.setVec4('u_innerColor', ic[0], ic[1], ic[2], ic[3]);

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
