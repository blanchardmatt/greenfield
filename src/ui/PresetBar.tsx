import { useState, useCallback, useRef } from 'react';
import { PresetManager } from '../core/PresetManager';
import type { RenderPipeline } from '../core/RenderPipeline';
import type { Preset } from '../core/types';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      onLoadPreset(pipelineData.chain);
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

  const handleExport = useCallback(
    (name: string) => {
      const mgr = new PresetManager(pipeline.parameterStore);
      const preset = mgr.loadAll().find((p) => p.name === name);
      if (!preset) return;
      const blob = new Blob([JSON.stringify(preset, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
    [pipeline.parameterStore],
  );

  const handleImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const preset = JSON.parse(reader.result as string) as Preset;
          if (preset.pipeline && preset.name) {
            const mgr = new PresetManager(pipeline.parameterStore);
            mgr.save(preset.name, preset.pipeline.chain);
            // Also apply it immediately
            onLoadPreset(preset.pipeline.chain);
            setTimeout(() => {
              for (const [eid, vals] of Object.entries(preset.pipeline.parameterOverrides)) {
                pipeline.parameterStore.setValues(eid, vals);
              }
            }, 0);
            refreshPresets();
          }
        } catch {
          console.warn('Invalid preset file');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    [pipeline, onLoadPreset, refreshPresets],
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
      <div className="preset-actions" style={{ marginTop: 4 }}>
        <button className="btn" onClick={handleImport} style={{ flex: 1, fontSize: 11 }}>
          Import JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      <div className="preset-list">
        {presets.map((preset) => (
          <div key={preset.name} className="preset-item">
            <span className="preset-item-name" onClick={() => handleLoad(preset.name)}>
              {preset.name}
            </span>
            <div style={{ display: 'flex', gap: 3 }}>
              <button
                className="btn"
                onClick={() => handleExport(preset.name)}
                title="Export"
                style={{ padding: '2px 5px', fontSize: 10 }}
              >
                JSON
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(preset.name)}
                title="Delete"
                style={{ padding: '2px 6px', fontSize: 11 }}
              >
                x
              </button>
            </div>
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
