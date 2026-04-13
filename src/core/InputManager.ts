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

  // Audio
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private fftData: Float32Array | null = null;
  private audioSource: MediaStreamAudioSourceNode | null = null;
  audioEnabled = false;

  // MIDI
  private midiAccess: MIDIAccess | null = null;
  private midiValues = new Map<number, number>();
  midiEnabled = false;

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

  // ─── Audio ─────────────────────────────────

  async enableAudio(): Promise<void> {
    if (this.audioEnabled) return;
    try {
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;
      this.fftData = new Float32Array(this.analyser.frequencyBinCount);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioSource = this.audioContext.createMediaStreamSource(stream);
      this.audioSource.connect(this.analyser);
      this.audioEnabled = true;
    } catch (err) {
      console.warn('Audio input not available:', err);
    }
  }

  disableAudio(): void {
    if (this.audioSource) {
      this.audioSource.disconnect();
      this.audioSource.mediaStream.getTracks().forEach((t) => t.stop());
      this.audioSource = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.analyser = null;
    this.fftData = null;
    this.audioEnabled = false;
    delete this.state.audioFFT;
  }

  // ─── MIDI ──────────────────────────────────

  async enableMIDI(): Promise<void> {
    if (this.midiEnabled) return;
    try {
      this.midiAccess = await navigator.requestMIDIAccess();
      this.midiAccess.inputs.forEach((input) => {
        input.onmidimessage = this.handleMIDIMessage;
      });
      this.midiAccess.onstatechange = () => {
        this.midiAccess?.inputs.forEach((input) => {
          input.onmidimessage = this.handleMIDIMessage;
        });
      };
      this.midiEnabled = true;
      this.state.midiCC = this.midiValues;
    } catch (err) {
      console.warn('MIDI not available:', err);
    }
  }

  private handleMIDIMessage = (event: MIDIMessageEvent): void => {
    const data = event.data;
    if (!data || data.length < 3) return;
    const status = data[0]! & 0xf0;
    // CC message
    if (status === 0xb0) {
      const cc = data[1]!;
      const value = data[2]! / 127; // normalize 0-1
      this.midiValues.set(cc, value);
    }
  };

  disableMIDI(): void {
    if (this.midiAccess) {
      this.midiAccess.inputs.forEach((input) => {
        input.onmidimessage = null;
      });
    }
    this.midiAccess = null;
    this.midiValues.clear();
    this.midiEnabled = false;
    delete this.state.midiCC;
  }

  // ─── Poll ──────────────────────────────────

  poll(): InputState {
    this.state.mouse.dx = this.state.mouse.x - this.prevMx;
    this.state.mouse.dy = this.state.mouse.y - this.prevMy;
    this.prevMx = this.state.mouse.x;
    this.prevMy = this.state.mouse.y;

    // Update audio FFT data
    if (this.analyser && this.fftData) {
      this.analyser.getFloatFrequencyData(this.fftData);
      this.state.audioFFT = this.fftData;
    }

    return this.state;
  }

  detach(): void {
    for (const [event, handler, target] of this.handlers) {
      target.removeEventListener(event, handler);
    }
    this.handlers = [];
    this.bound = false;
    this.disableAudio();
    this.disableMIDI();
  }
}
