import type { Preset, Pipeline } from './types';
import type { ParameterStore } from './ParameterStore';

const STORAGE_KEY = 'procedural-art-presets';
const CURRENT_VERSION = 1;

export class PresetManager {
  private parameterStore: ParameterStore;

  constructor(parameterStore: ParameterStore) {
    this.parameterStore = parameterStore;
  }

  save(name: string, chain: string[]): Preset {
    const preset: Preset = {
      version: CURRENT_VERSION,
      name,
      createdAt: new Date().toISOString(),
      pipeline: {
        chain,
        parameterOverrides: this.parameterStore.serialize(),
      },
    };
    const presets = this.loadAll();
    // Replace existing preset with same name, or add new
    const idx = presets.findIndex((p) => p.name === name);
    if (idx >= 0) {
      presets[idx] = preset;
    } else {
      presets.push(preset);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
    return preset;
  }

  loadAll(): Preset[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as Preset[];
    } catch {
      return [];
    }
  }

  load(name: string): Pipeline | null {
    const presets = this.loadAll();
    const preset = presets.find((p) => p.name === name);
    return preset?.pipeline ?? null;
  }

  delete(name: string): void {
    const presets = this.loadAll().filter((p) => p.name !== name);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  }

  rename(oldName: string, newName: string): void {
    const presets = this.loadAll();
    const preset = presets.find((p) => p.name === oldName);
    if (preset) {
      preset.name = newName;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
    }
  }
}
