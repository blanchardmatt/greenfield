import type { EffectNodeDescriptor, FrameContext, ParameterValues } from '../core/types';
import { BaseEffect } from './BaseEffect';
import vertSrc from '../shaders/common/fullscreen-quad.vert?raw';
import fragSrc from '../shaders/waveform/waveform.frag?raw';

const DESCRIPTOR: EffectNodeDescriptor = {
  id: 'audio-waveform',
  name: 'Audio Waveform',
  description: 'Audio-reactive visualizer with waveforms, circular, and bar modes',
  parameters: [
    { id: 'visualMode', type: 'enum', label: 'Mode', options: [
      { value: '0', label: 'Waveforms' },
      { value: '1', label: 'Circular' },
      { value: '2', label: 'Frequency Bars' },
    ], default: '0', group: 'Visualization' },
    { id: 'waveCount', type: 'int', label: 'Wave Count', min: 1, max: 8, default: 4, group: 'Shape' },
    { id: 'waveAmplitude', type: 'float', label: 'Amplitude', min: 0, max: 0.5, step: 0.01, default: 0.15, group: 'Shape' },
    { id: 'waveSpeed', type: 'float', label: 'Speed', min: 0, max: 5, step: 0.01, default: 1.0, group: 'Shape' },
    { id: 'lineWidth', type: 'float', label: 'Line Width', min: 0.5, max: 5, step: 0.1, default: 2.0, group: 'Shape' },
    { id: 'glowIntensity', type: 'float', label: 'Glow', min: 0, max: 3, step: 0.01, default: 1.0, group: 'Appearance' },
    { id: 'colorCycle', type: 'float', label: 'Color Cycle', min: 0, max: 5, step: 0.01, default: 1.0, group: 'Color' },
    { id: 'mouseInfluence', type: 'float', label: 'Mouse Influence', min: 0, max: 2, step: 0.01, default: 0.3, group: 'Interaction' },
  ],
  inputs: [{ id: 'input0', label: 'Background', type: 'texture' }],
  outputs: [{ id: 'output0', label: 'Result', type: 'texture' }],
};

export class AudioWaveform extends BaseEffect {
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

    // Compute audio levels from FFT data
    let audioLevel = 0;
    let bassLevel = 0;
    let midLevel = 0;
    let trebleLevel = 0;

    if (input.audioFFT) {
      const fft = input.audioFFT;
      const binCount = fft.length;
      const bassEnd = Math.floor(binCount * 0.15);
      const midEnd = Math.floor(binCount * 0.5);

      let bassSum = 0, midSum = 0, trebleSum = 0;
      for (let i = 0; i < binCount; i++) {
        // FFT returns dB values (typically -100 to 0), normalize to 0-1
        const val = Math.max(0, (fft[i]! + 100) / 100);
        if (i < bassEnd) bassSum += val;
        else if (i < midEnd) midSum += val;
        else trebleSum += val;
      }
      bassLevel = bassSum / bassEnd;
      midLevel = midSum / (midEnd - bassEnd);
      trebleLevel = trebleSum / (binCount - midEnd);
      audioLevel = (bassLevel + midLevel + trebleLevel) / 3;
    } else {
      // Generate synthetic audio-like data from time for visual demo
      bassLevel = 0.3 + Math.sin(time * 1.2) * 0.2 + Math.sin(time * 0.5) * 0.15;
      midLevel = 0.25 + Math.sin(time * 2.1) * 0.15 + Math.sin(time * 0.8) * 0.1;
      trebleLevel = 0.2 + Math.sin(time * 3.7) * 0.12 + Math.sin(time * 1.5) * 0.08;
      audioLevel = (bassLevel + midLevel + trebleLevel) / 3;
    }

    s.setFloat('u_time', time);
    s.setVec2('u_resolution', resolution[0], resolution[1]);
    s.setVec2('u_mouse', input.mouse.x, input.mouse.y);
    s.setFloat('u_audioLevel', audioLevel);
    s.setFloat('u_bassLevel', bassLevel);
    s.setFloat('u_midLevel', midLevel);
    s.setFloat('u_trebleLevel', trebleLevel);
    s.setFloat('u_lineWidth', params.lineWidth as number);
    s.setFloat('u_glowIntensity', params.glowIntensity as number);
    s.setFloat('u_waveAmplitude', params.waveAmplitude as number);
    s.setFloat('u_waveSpeed', params.waveSpeed as number);
    s.setInt('u_waveCount', params.waveCount as number);
    s.setFloat('u_colorCycle', params.colorCycle as number);
    s.setFloat('u_mouseInfluence', params.mouseInfluence as number);
    s.setInt('u_visualMode', parseInt(params.visualMode as string, 10));

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
