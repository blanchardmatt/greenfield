import type { ParameterDef, ParameterValue } from '../../core/types';
import { SliderControl } from './SliderControl';
import { ColorControl } from './ColorControl';
import { DropdownControl } from './DropdownControl';
import { ToggleControl } from './ToggleControl';
import { StringControl } from './StringControl';
import { ActionControl } from './ActionControl';

interface ControlFactoryProps {
  def: ParameterDef;
  value: ParameterValue;
  onChange: (value: ParameterValue) => void;
  effectId?: string;
}

export function ControlFactory({ def, value, onChange, effectId }: ControlFactoryProps) {
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
    case 'string':
      return (
        <StringControl
          def={def}
          value={value as string}
          onChange={onChange}
        />
      );
    case 'action':
      return effectId ? <ActionControl def={def} effectId={effectId} /> : null;
    case 'vec2':
      return null;
    default:
      return null;
  }
}
