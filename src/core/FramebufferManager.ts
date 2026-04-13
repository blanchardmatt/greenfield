export interface AcquiredFBO {
  fbo: WebGLFramebuffer;
  texture: WebGLTexture;
  width: number;
  height: number;
}

interface PoolEntry {
  fbo: WebGLFramebuffer;
  texture: WebGLTexture;
  inUse: boolean;
}

export class FramebufferManager {
  private pool = new Map<string, PoolEntry[]>();
  private gl: WebGL2RenderingContext;

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
  }

  acquire(width: number, height: number): AcquiredFBO {
    const key = `${width}x${height}`;
    const entries = this.pool.get(key);
    if (entries) {
      const entry = entries.find((e) => !e.inUse);
      if (entry) {
        entry.inUse = true;
        return { fbo: entry.fbo, texture: entry.texture, width, height };
      }
    }

    // Create new FBO
    const { gl } = this;
    const fbo = gl.createFramebuffer()!;
    const texture = gl.createTexture()!;

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, width, height, 0, gl.RGBA, gl.FLOAT, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    const entry: PoolEntry = { fbo, texture, inUse: true };
    if (!this.pool.has(key)) this.pool.set(key, []);
    this.pool.get(key)!.push(entry);

    return { fbo, texture, width, height };
  }

  release(acquired: AcquiredFBO): void {
    const key = `${acquired.width}x${acquired.height}`;
    const entries = this.pool.get(key);
    if (!entries) return;
    const entry = entries.find((e) => e.fbo === acquired.fbo);
    if (entry) entry.inUse = false;
  }

  handleResize(): void {
    // Clear the pool — FBOs will be lazily recreated at new sizes
    const { gl } = this;
    for (const entries of this.pool.values()) {
      for (const entry of entries) {
        gl.deleteFramebuffer(entry.fbo);
        gl.deleteTexture(entry.texture);
      }
    }
    this.pool.clear();
  }

  dispose(): void {
    this.handleResize();
  }
}
