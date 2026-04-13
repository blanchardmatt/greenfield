import { useCallback } from 'react';
import { getEffectIds } from '../effects';

interface EffectSelectorProps {
  activeEffects: string[];
  onChange: (effectIds: string[]) => void;
}

interface EffectInfo {
  label: string;
  category: string;
}

const EFFECTS: Record<string, EffectInfo> = {
  'noise-flow-field': { label: 'Noise Flow Field', category: 'Generative' },
  'voronoi-liquid': { label: 'Voronoi Liquid', category: 'Generative' },
  'domain-warp-tunnel': { label: 'Domain Warp', category: 'Generative' },
  'kaleidoscope': { label: 'Kaleidoscope', category: 'Generative' },
  'fractal-explorer': { label: 'Fractal Explorer', category: '3D / Math' },
  'raymarched-metaballs': { label: 'Raymarched Metaballs', category: '3D / Math' },
  'particle-system': { label: 'Particle System', category: 'Simulation' },
  'organic-vines': { label: 'Ornamental Flourish', category: 'Simulation' },
  'feedback-echo': { label: 'Feedback Echo', category: 'Post-FX' },
  'audio-waveform': { label: 'Audio Waveform', category: 'Reactive' },
};

export function EffectSelector({ activeEffects, onChange }: EffectSelectorProps) {
  const allIds = getEffectIds();

  // Group by category
  const categories = new Map<string, string[]>();
  for (const id of allIds) {
    const cat = EFFECTS[id]?.category ?? 'Other';
    if (!categories.has(cat)) categories.set(cat, []);
    categories.get(cat)!.push(id);
  }

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

  const getLabel = (id: string) => EFFECTS[id]?.label ?? id;

  return (
    <div className="effect-selector">
      <label>Active Effect</label>
      <select value={activeEffects[0] ?? ''} onChange={handlePrimaryChange}>
        {Array.from(categories.entries()).map(([cat, ids]) => (
          <optgroup key={cat} label={cat}>
            {ids.map((id) => (
              <option key={id} value={id}>
                {getLabel(id)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {activeEffects.length > 1 && (
        <div style={{ marginTop: 8 }}>
          <label style={{ fontSize: 11, color: '#888' }}>Effect Chain</label>
          {activeEffects.map((id, i) => (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 12, color: '#aaa', flex: 1 }}>
                {i + 1}. {getLabel(id)}
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
          {Array.from(categories.entries()).map(([cat, ids]) => {
            const available = ids.filter((id) => !activeEffects.includes(id));
            if (available.length === 0) return null;
            return (
              <optgroup key={cat} label={cat}>
                {available.map((id) => (
                  <option key={id} value={id}>
                    {getLabel(id)}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>
      </div>
    </div>
  );
}
