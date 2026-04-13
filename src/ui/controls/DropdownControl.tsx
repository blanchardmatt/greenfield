import { useCallback } from 'react';
import type { EnumParameterDef } from '../../core/types';

interface DropdownControlProps {
  def: EnumParameterDef;
  value: string;
  onChange: (value: string) => void;
}

export function DropdownControl({ def, value, onChange }: DropdownControlProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className="param-row">
      <span className="param-label" title={def.label}>{def.label}</span>
      <div className="param-control">
        <select value={value} onChange={handleChange}>
          {def.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
