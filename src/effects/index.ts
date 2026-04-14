import type { EffectNode, EffectNodeDescriptor } from '../core/types';
import { NoiseFlowField } from './NoiseFlowField';
import { FractalExplorer } from './FractalExplorer';
import { ParticleSystem } from './ParticleSystem';
import { FeedbackEcho } from './FeedbackEcho';
import { Kaleidoscope } from './Kaleidoscope';
import { AudioWaveform } from './AudioWaveform';
import { VoronoiLiquid } from './VoronoiLiquid';
import { RaymarchedMetaballs } from './RaymarchedMetaballs';
import { DomainWarpTunnel } from './DomainWarpTunnel';
import { OrganicVines } from './OrganicVines';
import { HandTracking } from './HandTracking';

type EffectFactory = () => EffectNode;

export const effectRegistry = new Map<string, EffectFactory>([
  ['noise-flow-field', () => new NoiseFlowField()],
  ['fractal-explorer', () => new FractalExplorer()],
  ['particle-system', () => new ParticleSystem()],
  ['feedback-echo', () => new FeedbackEcho()],
  ['kaleidoscope', () => new Kaleidoscope()],
  ['audio-waveform', () => new AudioWaveform()],
  ['voronoi-liquid', () => new VoronoiLiquid()],
  ['raymarched-metaballs', () => new RaymarchedMetaballs()],
  ['domain-warp-tunnel', () => new DomainWarpTunnel()],
  ['organic-vines', () => new OrganicVines()],
  ['hand-tracking', () => new HandTracking()],
]);

export function getEffectDescriptors(): EffectNodeDescriptor[] {
  const descriptors: EffectNodeDescriptor[] = [];
  for (const [, factory] of effectRegistry) {
    const instance = factory();
    descriptors.push(instance.descriptor);
  }
  return descriptors;
}

export function getEffectIds(): string[] {
  return Array.from(effectRegistry.keys());
}
