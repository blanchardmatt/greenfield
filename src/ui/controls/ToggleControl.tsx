import { useCallback } from 'react';
import type { BoolParameterDef } from '../../core/types';

interface ToggleControlProps {
  def: BoolParameterDef;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function ToggleControl({ def, value, onChange }: ToggleControlProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
    [onChange],
  );

  return (
    <div className="param-row">
      <span className="param-label" title={def.label}>{def.label}</span>
      <div className="param-control">
        <label className="toggle-switch">
          <input type="checkbox" checked={value} onChange={handleChange} />
          <span className="toggle-track" />
        </label>
      </div>
    </div>
  );
}
