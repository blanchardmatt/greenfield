import type { InputState } from './types';

export class InputManager {
  private canvas: HTMLCanvasElement;
  private state: InputState = {
    mouse: { x: 0.5, y: 0.5, px: 0, py: 0, down: false, button: 0, dx: 0, dy: 0 },
    keys: new Set(),
    touches: [],
  };
  private prevMx = 0;
  private prevMy = 0;
  private bound = false;
  private handlers: Array<[string, EventListener, EventTarget]> = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  attach(): void {
    if (this.bound) return;
    this.bound = true;

    const on = (
      target: EventTarget,
      event: string,
      handler: EventListener,
    ) => {
      target.addEventListener(event, handler);
      this.handlers.push([event, handler, target]);
    };

    on(this.canvas, 'mousemove', (e) => {
      const me = e as MouseEvent;
      const rect = this.canvas.getBoundingClientRect();
      this.state.mouse.px = me.clientX - rect.left;
      this.state.mouse.py = me.clientY - rect.top;
      this.state.mouse.x = this.state.mouse.px / rect.width;
      this.state.mouse.y = 1 - this.state.mouse.py / rect.height;
    });

    on(this.canvas, 'mousedown', (e) => {
      const me = e as MouseEvent;
      this.state.mouse.down = true;
      this.state.mouse.button = me.button;
    });

    on(this.canvas, 'mouseup', () => {
      this.state.mouse.down = false;
    });

    on(this.canvas, 'mouseleave', () => {
      this.state.mouse.down = false;
    });

    on(window, 'keydown', (e) => {
      this.state.keys.add((e as KeyboardEvent).code);
    });

    on(window, 'keyup', (e) => {
      this.state.keys.delete((e as KeyboardEvent).code);
    });

    on(this.canvas, 'touchstart', (e) => {
      e.preventDefault();
      this.updateTouches(e as TouchEvent);
    });

    on(this.canvas, 'touchmove', (e) => {
      e.preventDefault();
      this.updateTouches(e as TouchEvent);
    });

    on(this.canvas, 'touchend', (e) => {
      this.updateTouches(e as TouchEvent);
    });

    on(this.canvas, 'contextmenu', (e) => e.preventDefault());
  }

  private updateTouches(e: TouchEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.state.touches = Array.from(e.touches).map((t) => ({
      id: t.identifier,
      x: (t.clientX - rect.left) / rect.width,
      y: 1 - (t.clientY - rect.top) / rect.height,
    }));
    // Map first touch to mouse for unified input
    if (e.touches.length > 0) {
      const t = e.touches[0]!;
      this.state.mouse.px = t.clientX - rect.left;
      this.state.mouse.py = t.clientY - rect.top;
      this.state.mouse.x = this.state.mouse.px / rect.width;
      this.state.mouse.y = 1 - this.state.mouse.py / rect.height;
      this.state.mouse.down = true;
    } else {
      this.state.mouse.down = false;
    }
  }

  /** Call once per frame to compute deltas */
  poll(): InputState {
    this.state.mouse.dx = this.state.mouse.x - this.prevMx;
    this.state.mouse.dy = this.state.mouse.y - this.prevMy;
    this.prevMx = this.state.mouse.x;
    this.prevMy = this.state.mouse.y;
    return this.state;
  }

  detach(): void {
    for (const [event, handler, target] of this.handlers) {
      target.removeEventListener(event, handler);
    }
    this.handlers = [];
    this.bound = false;
  }
}
