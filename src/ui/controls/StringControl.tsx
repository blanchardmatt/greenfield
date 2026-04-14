import { useCallback } from 'react';
import type { StringParameterDef } from '../../core/types';

interface StringControlProps {
  def: StringParameterDef;
  value: string;
  onChange: (value: string) => void;
}

export function StringControl({ def, value, onChange }: StringControlProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className="param-row param-row--column">
      <span className="param-label" title={def.label}>{def.label}</span>
      <div className="param-control" style={{ width: '100%' }}>
        {def.multiline ? (
          <textarea
            className="param-textarea"
            value={value}
            onChange={handleChange}
            placeholder={def.placeholder}
            rows={2}
          />
        ) : (
          <input
            type="text"
            className="param-text-input"
            value={value}
            onChange={handleChange}
            placeholder={def.placeholder}
          />
        )}
      </div>
    </div>
  );
}
