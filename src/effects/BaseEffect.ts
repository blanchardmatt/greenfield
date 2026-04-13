import type { EffectNode, EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { ShaderProgram } from '../core/ShaderProgram';
import noiseGlsl from '../shaders/common/noise.glsl?raw';
import colorUtilsGlsl from '../shaders/common/color-utils.glsl?raw';

export const SHARED_INCLUDES = new Map<string, string>([
  ['noise.glsl', noiseGlsl],
  ['color-utils.glsl', colorUtilsGlsl],
]);

export abstract class BaseEffect implements EffectNode {
  abstract readonly descriptor: EffectNodeDescriptor;
  protected shader: ShaderProgram | null = null;
  protected outputTexture: WebGLTexture | null = null;
  protected gl: WebGL2RenderingContext | null = null;
  protected w = 0;
  protected h = 0;

  abstract init(gl: WebGL2RenderingContext): void;
  abstract render(
    ctx: FrameContext,
    params: ParameterValues,
    inputTextures: Map<string, WebGLTexture>,
  ): void;

  resize(width: number, height: number): void {
    this.w = width;
    this.h = height;
  }

  dispose(): void {
    this.shader?.dispose();
    this.shader = null;
  }

  getOutputTexture(_portId?: string): WebGLTexture | null {
    return this.outputTexture;
  }

  protected createShader(
    gl: WebGL2RenderingContext,
    vertSrc: string,
    fragSrc: string,
  ): ShaderProgram {
    return new ShaderProgram(gl, vertSrc, fragSrc, SHARED_INCLUDES);
  }
}
