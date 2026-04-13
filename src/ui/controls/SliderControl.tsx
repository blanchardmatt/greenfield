import { useState, useCallback } from 'react';
import type { FloatParameterDef, IntParameterDef } from '../../core/types';

interface SliderControlProps {
  def: FloatParameterDef | IntParameterDef;
  value: number;
  onChange: (value: number) => void;
}

export function SliderControl({ def, value, onChange }: SliderControlProps) {
  const [localValue, setLocalValue] = useState(value);
  const step = def.type === 'int' ? 1 : (def as FloatParameterDef).step ?? 0.01;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = def.type === 'int'
        ? parseInt(e.target.value, 10)
        : parseFloat(e.target.value);
      setLocalValue(v);
      onChange(v);
    },
    [def.type, onChange],
  );

  // Sync external value changes
  if (Math.abs(localValue - value) > step * 0.5) {
    setLocalValue(value);
  }

  const display = def.type === 'int'
    ? localValue.toString()
    : localValue.toFixed(step < 0.01 ? 4 : step < 0.1 ? 2 : 1);

  return (
    <div className="param-row">
      <span className="param-label" title={def.label}>{def.label}</span>
      <div className="param-control">
        <input
          type="range"
          min={def.min}
          max={def.max}
          step={step}
          value={localValue}
          onChange={handleChange}
        />
        <span className="param-value">{display}</span>
      </div>
    </div>
  );
}
