import { useState, useCallback } from 'react';
import { PresetManager } from '../core/PresetManager';
import type { RenderPipeline } from '../core/RenderPipeline';

interface PresetBarProps {
  pipeline: RenderPipeline;
  activeEffects: string[];
  onLoadPreset: (effectIds: string[]) => void;
}

export function PresetBar({ pipeline, activeEffects, onLoadPreset }: PresetBarProps) {
  const [presetName, setPresetName] = useState('');
  const [presets, setPresets] = useState(() => {
    const mgr = new PresetManager(pipeline.parameterStore);
    return mgr.loadAll();
  });

  const refreshPresets = useCallback(() => {
    const mgr = new PresetManager(pipeline.parameterStore);
    setPresets(mgr.loadAll());
  }, [pipeline.parameterStore]);

  const handleSave = useCallback(() => {
    if (!presetName.trim()) return;
    const mgr = new PresetManager(pipeline.parameterStore);
    mgr.save(presetName.trim(), activeEffects);
    setPresetName('');
    refreshPresets();
  }, [presetName, pipeline.parameterStore, activeEffects, refreshPresets]);

  const handleLoad = useCallback(
    (name: string) => {
      const mgr = new PresetManager(pipeline.parameterStore);
      const pipelineData = mgr.load(name);
      if (!pipelineData) return;

      // Apply effect chain
      onLoadPreset(pipelineData.chain);

      // Apply parameter overrides after a tick (so effects are registered)
      setTimeout(() => {
        for (const [effectId, values] of Object.entries(pipelineData.parameterOverrides)) {
          pipeline.parameterStore.setValues(effectId, values);
        }
      }, 0);
    },
    [pipeline, onLoadPreset],
  );

  const handleDelete = useCallback(
    (name: string) => {
      const mgr = new PresetManager(pipeline.parameterStore);
      mgr.delete(name);
      refreshPresets();
    },
    [pipeline.parameterStore, refreshPresets],
  );

  return (
    <div className="preset-bar">
      <label>Presets</label>
      <div className="preset-actions">
        <input
          type="text"
          placeholder="Preset name..."
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>
      <div className="preset-list">
        {presets.map((preset) => (
          <div key={preset.name} className="preset-item">
            <span className="preset-item-name" onClick={() => handleLoad(preset.name)}>
              {preset.name}
            </span>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(preset.name)}
              style={{ padding: '2px 6px', fontSize: 11 }}
            >
              x
            </button>
          </div>
        ))}
        {presets.length === 0 && (
          <div style={{ fontSize: 12, color: '#555', padding: 8 }}>
            No presets saved yet
          </div>
        )}
      </div>
    </div>
  );
}
