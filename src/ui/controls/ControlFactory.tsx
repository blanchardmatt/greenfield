import type { ParameterDef, ParameterValue } from '../../core/types';
import { SliderControl } from './SliderControl';
import { ColorControl } from './ColorControl';
import { DropdownControl } from './DropdownControl';
import { ToggleControl } from './ToggleControl';

interface ControlFactoryProps {
  def: ParameterDef;
  value: ParameterValue;
  onChange: (value: ParameterValue) => void;
}

export function ControlFactory({ def, value, onChange }: ControlFactoryProps) {
  switch (def.type) {
    case 'float':
    case 'int':
      return (
        <SliderControl
          def={def}
          value={value as number}
          onChange={onChange}
        />
      );
    case 'color':
      return (
        <ColorControl
          def={def}
          value={value as [number, number, number, number]}
          onChange={onChange}
        />
      );
    case 'enum':
      return (
        <DropdownControl
          def={def}
          value={value as string}
          onChange={onChange}
        />
      );
    case 'bool':
      return (
        <ToggleControl
          def={def}
          value={value as boolean}
          onChange={onChange}
        />
      );
    case 'vec2':
      // For now, render as two sliders
      return null;
    default:
      return null;
  }
}
