import { useCallback } from 'react';
import type { ColorParameterDef } from '../../core/types';

interface ColorControlProps {
  def: ColorParameterDef;
  value: [number, number, number, number];
  onChange: (value: [number, number, number, number]) => void;
}

function rgbaToHex(r: number, g: number, b: number): string {
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgba(hex: string, a: number): [number, number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b, a];
}

export function ColorControl({ def, value, onChange }: ColorControlProps) {
  const hex = rgbaToHex(value[0], value[1], value[2]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(hexToRgba(e.target.value, value[3]));
    },
    [onChange, value],
  );

  return (
    <div className="param-row">
      <span className="param-label" title={def.label}>{def.label}</span>
      <div className="param-control">
        <input type="color" value={hex} onChange={handleChange} />
        <span className="param-value">{hex}</span>
      </div>
    </div>
  );
}
