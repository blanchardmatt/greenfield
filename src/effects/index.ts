import type { EffectNode, EffectNodeDescriptor } from '../core/types';
import { NoiseFlowField } from './NoiseFlowField';
import { FractalExplorer } from './FractalExplorer';
import { ParticleSystem } from './ParticleSystem';
import { FeedbackEcho } from './FeedbackEcho';

type EffectFactory = () => EffectNode;

export const effectRegistry = new Map<string, EffectFactory>([
  ['noise-flow-field', () => new NoiseFlowField()],
  ['fractal-explorer', () => new FractalExplorer()],
  ['particle-system', () => new ParticleSystem()],
  ['feedback-echo', () => new FeedbackEcho()],
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
