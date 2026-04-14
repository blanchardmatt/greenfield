import { useCallback, useRef, useState } from 'react';
import { getEffectIds } from '../effects';

interface EffectSelectorProps {
  activeEffects: string[];
  onChange: (effectIds: string[]) => void;
  focusedEffect?: string | null;
  onFocusEffect?: (id: string) => void;
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
  'hand-tracking': { label: 'Hand Tracking', category: 'Reactive' },
};

export function EffectSelector({ activeEffects, onChange, focusedEffect, onFocusEffect }: EffectSelectorProps) {
  const allIds = getEffectIds();
  const chainListRef = useRef<HTMLDivElement>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  // Group by category
  const categories = new Map<string, string[]>();
  for (const id of allIds) {
    const cat = EFFECTS[id]?.category ?? 'Other';
    if (!categories.has(cat)) categories.set(cat, []);
    categories.get(cat)!.push(id);
  }

  const handlePrimaryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = e.target.value;
      onChange([id]);
      onFocusEffect?.(id);
    },
    [onChange, onFocusEffect],
  );

  const handleAddEffect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = e.target.value;
      if (id && !activeEffects.includes(id)) {
        onChange([...activeEffects, id]);
        onFocusEffect?.(id);
      }
      e.target.value = '';
    },
    [activeEffects, onChange, onFocusEffect],
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

  // --- Drag to reorder ---
  const computeDropIndex = useCallback((clientY: number): number => {
    const list = chainListRef.current;
    if (!list) return 0;
    const rows = Array.from(list.querySelectorAll<HTMLDivElement>('.chain-row'));
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i]!.getBoundingClientRect();
      if (clientY < r.top + r.height / 2) return i;
    }
    return rows.length;
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, index: number) => {
      e.preventDefault();
      e.stopPropagation();
      const target = e.currentTarget;
      target.setPointerCapture(e.pointerId);
      setDragIndex(index);
      setDropIndex(index);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (dragIndex === null) return;
      e.preventDefault();
      setDropIndex(computeDropIndex(e.clientY));
    },
    [dragIndex, computeDropIndex],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (dragIndex === null) {
        return;
      }
      const target = e.currentTarget;
      if (target.hasPointerCapture(e.pointerId)) {
        target.releasePointerCapture(e.pointerId);
      }
      const finalDrop = computeDropIndex(e.clientY);
      const from = dragIndex;
      // Adjust target index if we removed an earlier item
      let to = finalDrop > from ? finalDrop - 1 : finalDrop;
      to = Math.max(0, Math.min(activeEffects.length - 1, to));
      setDragIndex(null);
      setDropIndex(null);
      if (to !== from) {
        const next = [...activeEffects];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved!);
        onChange(next);
      }
    },
    [dragIndex, computeDropIndex, activeEffects, onChange],
  );

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
          <label style={{ fontSize: 11, color: '#888' }}>Effect Chain (drag to reorder, tap to edit)</label>
          <div ref={chainListRef} className="chain-list">
            {activeEffects.map((id, i) => (
              <div
                key={id}
                className={`chain-row ${dragIndex === i ? 'chain-row--dragging' : ''} ${
                  dragIndex !== null && dropIndex === i && dragIndex !== i ? 'chain-row--drop-above' : ''
                } ${
                  dragIndex !== null && dropIndex === i + 1 && dragIndex !== i && i === activeEffects.length - 1 ? 'chain-row--drop-below' : ''
                } ${focusedEffect === id ? 'chain-row--focused' : ''}`}
                onClick={() => onFocusEffect?.(id)}
                role="button"
              >
                <button
                  className="chain-drag-handle"
                  onPointerDown={(e) => handlePointerDown(e, i)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Drag to reorder"
                  title="Drag to reorder"
                >
                  {'\u2630'}
                </button>
                <span className="chain-row-label">
                  {i + 1}. {getLabel(id)}
                </span>
                <button
                  className="btn btn-danger chain-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveEffect(id);
                  }}
                  aria-label="Remove"
                >
                  x
                </button>
              </div>
            ))}
          </div>
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
