import { useState, useCallback, useRef, useEffect } from 'react';
import type { FloatParameterDef, IntParameterDef } from '../../core/types';

interface SliderControlProps {
  def: FloatParameterDef | IntParameterDef;
  value: number;
  onChange: (value: number) => void;
}

interface DragState {
  startX: number;
  startValue: number;
  trackWidth: number;
  trackLeft: number;
  moved: boolean;
}

export function SliderControl({ def, value, onChange }: SliderControlProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [, force] = useState(0);

  const min = def.min;
  const max = def.max;
  const baseStep = def.type === 'int' ? 1 : (def as FloatParameterDef).step ?? 0.01;
  const range = max - min;

  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const quantize = (v: number, step: number) => Math.round(v / step) * step;

  // Round-trip through step so we don't accumulate float drift
  const finalize = useCallback(
    (v: number, step: number) => {
      let q = quantize(v, step);
      q = clamp(q);
      if (def.type === 'int') q = Math.round(q);
      // Clean up float artifacts (e.g. 0.30000000000000004 → 0.3)
      if (def.type !== 'int') {
        const decimals = step < 0.001 ? 4 : step < 0.01 ? 3 : step < 0.1 ? 2 : 1;
        q = parseFloat(q.toFixed(decimals));
      }
      return q;
    },
    [def.type],
  );

  const apply = useCallback(
    (v: number, step: number) => {
      onChange(finalize(v, step));
    },
    [onChange, finalize],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      const track = trackRef.current;
      if (!track) return;
      track.setPointerCapture(e.pointerId);
      const rect = track.getBoundingClientRect();
      dragRef.current = {
        startX: e.clientX,
        startValue: value,
        trackWidth: rect.width,
        trackLeft: rect.left,
        moved: false,
      };
      // Jump-to-click: instantly set value to the clicked position (only if not shift-held)
      if (!e.shiftKey) {
        const ratio = (e.clientX - rect.left) / rect.width;
        const newVal = min + ratio * range;
        apply(newVal, baseStep);
        // Update startValue to the new value so subsequent drag is relative to the click point
        dragRef.current.startValue = finalize(newVal, baseStep);
        dragRef.current.startX = e.clientX;
      }
      force((n) => n + 1);
    },
    [value, min, range, baseStep, apply, finalize],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag) return;
      e.preventDefault();
      const dx = e.clientX - drag.startX;
      if (Math.abs(dx) > 1) drag.moved = true;
      // Shift = fine (1/10 sensitivity), Alt = coarse (5x sensitivity)
      const sensitivity = e.shiftKey ? 0.1 : e.altKey ? 5 : 1;
      const ratioDelta = (dx / drag.trackWidth) * sensitivity;
      const newVal = drag.startValue + ratioDelta * range;
      // Use the param's natural step regardless of modifier — modifier only
      // affects sensitivity, not granularity (keeps int sliders snapping right)
      apply(newVal, baseStep);
    },
    [range, apply, baseStep],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (drag && trackRef.current?.hasPointerCapture(e.pointerId)) {
        trackRef.current.releasePointerCapture(e.pointerId);
      }
      dragRef.current = null;
    },
    [],
  );

  // Click value to edit numerically
  const startEdit = useCallback(() => {
    setEditText(String(value));
    setEditing(true);
  }, [value]);

  const commitEdit = useCallback(() => {
    const v = parseFloat(editText);
    if (!Number.isNaN(v)) {
      apply(v, baseStep);
    }
    setEditing(false);
  }, [editText, apply, baseStep]);

  // Keyboard arrow support when track is focused
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      let dir = 0;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') dir = 1;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') dir = -1;
      if (dir === 0) return;
      e.preventDefault();
      const stepToUse = e.shiftKey ? baseStep * 0.1 : e.altKey ? baseStep * 10 : baseStep;
      apply(value + dir * stepToUse, def.type === 'int' ? Math.max(1, stepToUse) : stepToUse);
    },
    [value, baseStep, apply, def.type],
  );

  // Auto-select edit text on focus
  const editInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editing && editInputRef.current) {
      editInputRef.current.select();
    }
  }, [editing]);

  const ratio = range > 0 ? (value - min) / range : 0;
  const decimals = baseStep < 0.001 ? 4 : baseStep < 0.01 ? 3 : baseStep < 0.1 ? 2 : 1;
  const display = def.type === 'int' ? value.toString() : value.toFixed(decimals);

  return (
    <div className="param-row">
      <span className="param-label" title={`${def.label} — drag to change · Shift = fine · Alt = coarse · click value to edit`}>
        {def.label}
      </span>
      <div className="param-control">
        <div
          ref={trackRef}
          className="slider-track"
          tabIndex={0}
          role="slider"
          aria-label={def.label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
        >
          <div className="slider-fill" style={{ width: `${Math.max(0, Math.min(100, ratio * 100))}%` }} />
          <div className="slider-thumb" style={{ left: `${Math.max(0, Math.min(100, ratio * 100))}%` }} />
        </div>
        {editing ? (
          <input
            ref={editInputRef}
            type="number"
            className="param-value-input"
            value={editText}
            step={baseStep}
            min={min}
            max={max}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitEdit();
              else if (e.key === 'Escape') setEditing(false);
            }}
          />
        ) : (
          <span
            className="param-value param-value--clickable"
            onClick={startEdit}
            title="Click to edit"
          >
            {display}
          </span>
        )}
      </div>
    </div>
  );
}
