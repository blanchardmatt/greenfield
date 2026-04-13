import { useCallback } from 'react';
import { getEffectIds } from '../effects';

interface EffectSelectorProps {
  activeEffects: string[];
  onChange: (effectIds: string[]) => void;
}

const EFFECT_LABELS: Record<string, string> = {
  'noise-flow-field': 'Noise Flow Field',
  'fractal-explorer': 'Fractal Explorer',
  'particle-system': 'Particle System',
  'feedback-echo': 'Feedback Echo',
  'kaleidoscope': 'Kaleidoscope',
  'audio-waveform': 'Audio Waveform',
  'voronoi-liquid': 'Voronoi Liquid',
  'raymarched-metaballs': 'Raymarched Metaballs',
  'domain-warp-tunnel': 'Domain Warp',
};

export function EffectSelector({ activeEffects, onChange }: EffectSelectorProps) {
  const allIds = getEffectIds();

  const handlePrimaryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange([e.target.value]);
    },
    [onChange],
  );

  const handleAddEffect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = e.target.value;
      if (id && !activeEffects.includes(id)) {
        onChange([...activeEffects, id]);
      }
      e.target.value = '';
    },
    [activeEffects, onChange],
  );

  const handleRemoveEffect = useCallback(
    (id: string) => {
      const newEffects = activeEffects.filter((eid) => eid !== id);
      if (newEffects.length > 0) {
        onChange(newEffects);
      }
    },
    [activeEffects, onChange],
  );

  return (
    <div className="effect-selector">
      <label>Active Effect</label>
      <select value={activeEffects[0] ?? ''} onChange={handlePrimaryChange}>
        {allIds.map((id) => (
          <option key={id} value={id}>
            {EFFECT_LABELS[id] ?? id}
          </option>
        ))}
      </select>

      {activeEffects.length > 1 && (
        <div style={{ marginTop: 8 }}>
          <label style={{ fontSize: 11, color: '#888' }}>Effect Chain</label>
          {activeEffects.map((id, i) => (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 12, color: '#aaa', flex: 1 }}>
                {i + 1}. {EFFECT_LABELS[id] ?? id}
              </span>
              {activeEffects.length > 1 && (
                <button className="btn btn-danger" onClick={() => handleRemoveEffect(id)} style={{ padding: '2px 6px', fontSize: 11 }}>
                  x
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 8 }}>
        <select onChange={handleAddEffect} defaultValue="">
          <option value="" disabled>+ Add to chain...</option>
          {allIds
            .filter((id) => !activeEffects.includes(id))
            .map((id) => (
              <option key={id} value={id}>
                {EFFECT_LABELS[id] ?? id}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
