export class Clock {
  private startTime = 0;
  private lastTime = 0;
  time = 0;
  deltaTime = 0;
  frameCount = 0;

  start(): void {
    this.startTime = performance.now() / 1000;
    this.lastTime = this.startTime;
    this.time = 0;
    this.deltaTime = 0;
    this.frameCount = 0;
  }

  tick(): void {
    const now = performance.now() / 1000;
    this.deltaTime = now - this.lastTime;
    this.lastTime = now;
    this.time = now - this.startTime;
    this.frameCount++;
  }
}
