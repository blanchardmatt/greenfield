export class GLContext {
  readonly gl: WebGL2RenderingContext;
  readonly emptyVAO: WebGLVertexArrayObject;
  private lost = false;

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });
    if (!gl) {
      throw new Error('WebGL 2 is not supported in this browser');
    }
    this.gl = gl;

    // Enable float textures for FBOs
    gl.getExtension('EXT_color_buffer_float');
    gl.getExtension('OES_texture_float_linear');

    // Empty VAO for fullscreen quad draws (uses gl_VertexID)
    const vao = gl.createVertexArray();
    if (!vao) throw new Error('Failed to create VAO');
    this.emptyVAO = vao;

    // Context loss handling
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.lost = true;
      console.warn('WebGL context lost');
    });
    canvas.addEventListener('webglcontextrestored', () => {
      this.lost = false;
      console.info('WebGL context restored');
    });
  }

  get isLost(): boolean {
    return this.lost;
  }

  bindFullscreenQuad(): void {
    this.gl.bindVertexArray(this.emptyVAO);
  }

  drawFullscreenQuad(): void {
    this.gl.bindVertexArray(this.emptyVAO);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }

  dispose(): void {
    this.gl.deleteVertexArray(this.emptyVAO);
  }
}
