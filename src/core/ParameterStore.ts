import type { EffectNodeDescriptor, ParameterValue, ParameterValues } from './types';

type Listener = () => void;

export class ParameterStore {
  private values = new Map<string, Map<string, ParameterValue>>();
  private descriptors = new Map<string, EffectNodeDescriptor>();
  private listeners = new Set<Listener>();
  private version = 0;

  registerEffect(instanceId: string, descriptor: EffectNodeDescriptor): void {
    this.descriptors.set(instanceId, descriptor);
    const vals = new Map<string, ParameterValue>();
    for (const p of descriptor.parameters) {
      vals.set(p.id, p.default);
    }
    this.values.set(instanceId, vals);
    this.notify();
  }

  unregisterEffect(instanceId: string): void {
    this.values.delete(instanceId);
    this.descriptors.delete(instanceId);
    this.notify();
  }

  setValue(instanceId: string, paramId: string, value: ParameterValue): void {
    const vals = this.values.get(instanceId);
    if (vals) {
      vals.set(paramId, value);
      this.notify();
    }
  }

  getValues(instanceId: string): ParameterValues {
    const vals = this.values.get(instanceId);
    if (!vals) return {};
    const out: ParameterValues = {};
    for (const [k, v] of vals) {
      out[k] = v;
    }
    return out;
  }

  getDescriptor(instanceId: string): EffectNodeDescriptor | undefined {
    return this.descriptors.get(instanceId);
  }

  getAllInstanceIds(): string[] {
    return Array.from(this.descriptors.keys());
  }

  setValues(instanceId: string, values: ParameterValues): void {
    const vals = this.values.get(instanceId);
    if (!vals) return;
    for (const [k, v] of Object.entries(values)) {
      vals.set(k, v);
    }
    this.notify();
  }

  /** Serialize all values for preset saving */
  serialize(): Record<string, ParameterValues> {
    const out: Record<string, ParameterValues> = {};
    for (const [id, vals] of this.values) {
      out[id] = this.getValues(id);
      // Suppress unused variable — vals is used via getValues indirectly
      void vals;
    }
    return out;
  }

  /** For useSyncExternalStore */
  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): number => {
    return this.version;
  };

  private notify(): void {
    this.version++;
    for (const l of this.listeners) {
      l();
    }
  }
}
