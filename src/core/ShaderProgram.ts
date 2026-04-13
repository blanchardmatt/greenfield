const INCLUDE_RE = /#include\s+<(.+?)>/g;

export class ShaderProgram {
  readonly program: WebGLProgram;
  private readonly gl: WebGL2RenderingContext;
  private readonly uniformCache = new Map<string, WebGLUniformLocation | null>();

  constructor(
    gl: WebGL2RenderingContext,
    vertSrc: string,
    fragSrc: string,
    includes?: Map<string, string>,
  ) {
    this.gl = gl;

    const processedVert = ShaderProgram.preprocess(vertSrc, includes);
    const processedFrag = ShaderProgram.preprocess(fragSrc, includes);

    const vs = ShaderProgram.compile(gl, gl.VERTEX_SHADER, processedVert);
    const fs = ShaderProgram.compile(gl, gl.FRAGMENT_SHADER, processedFrag);

    const program = gl.createProgram();
    if (!program) throw new Error('Failed to create program');

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    // Shaders can be deleted after linking
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(`Program link failed: ${info}`);
    }

    this.program = program;
  }

  private static preprocess(
    source: string,
    includes?: Map<string, string>,
  ): string {
    if (!includes) return source;
    return source.replace(INCLUDE_RE, (_, name: string) => {
      const content = includes.get(name);
      if (content === undefined) {
        console.warn(`Shader include not found: ${name}`);
        return '';
      }
      return content;
    });
  }

  private static compile(
    gl: WebGL2RenderingContext,
    type: number,
    source: string,
  ): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) throw new Error('Failed to create shader');
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      const typeName = type === gl.VERTEX_SHADER ? 'vertex' : 'fragment';
      gl.deleteShader(shader);
      throw new Error(`${typeName} shader compile failed:\n${info}\n\nSource:\n${source}`);
    }
    return shader;
  }

  use(): void {
    this.gl.useProgram(this.program);
  }

  private loc(name: string): WebGLUniformLocation | null {
    let l = this.uniformCache.get(name);
    if (l === undefined) {
      l = this.gl.getUniformLocation(this.program, name);
      this.uniformCache.set(name, l);
    }
    return l;
  }

  setFloat(name: string, v: number): void {
    const l = this.loc(name);
    if (l) this.gl.uniform1f(l, v);
  }

  setInt(name: string, v: number): void {
    const l = this.loc(name);
    if (l) this.gl.uniform1i(l, v);
  }

  setVec2(name: string, x: number, y: number): void {
    const l = this.loc(name);
    if (l) this.gl.uniform2f(l, x, y);
  }

  setVec3(name: string, x: number, y: number, z: number): void {
    const l = this.loc(name);
    if (l) this.gl.uniform3f(l, x, y, z);
  }

  setVec4(name: string, x: number, y: number, z: number, w: number): void {
    const l = this.loc(name);
    if (l) this.gl.uniform4f(l, x, y, z, w);
  }

  setTexture(name: string, texture: WebGLTexture, unit: number): void {
    this.gl.activeTexture(this.gl.TEXTURE0 + unit);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    const l = this.loc(name);
    if (l) this.gl.uniform1i(l, unit);
  }

  dispose(): void {
    this.gl.deleteProgram(this.program);
  }
}
