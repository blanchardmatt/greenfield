import { useSyncExternalStore, useCallback } from 'react';
import type { ParameterStore } from '../core/ParameterStore';
import type { ParameterValue } from '../core/types';
import { ControlFactory } from './controls/ControlFactory';

interface ParameterPanelProps {
  parameterStore: ParameterStore;
}

export function ParameterPanel({ parameterStore }: ParameterPanelProps) {
  const version = useSyncExternalStore(
    parameterStore.subscribe,
    parameterStore.getSnapshot,
  );

  // Force re-read on version change
  void version;

  const instanceIds = parameterStore.getAllInstanceIds();

  return (
    <div className="parameter-panel">
      {instanceIds.map((instanceId) => (
        <EffectParameters
          key={instanceId}
          instanceId={instanceId}
          parameterStore={parameterStore}
        />
      ))}
    </div>
  );
}

function EffectParameters({
  instanceId,
  parameterStore,
}: {
  instanceId: string;
  parameterStore: ParameterStore;
}) {
  const descriptor = parameterStore.getDescriptor(instanceId);
  const values = parameterStore.getValues(instanceId);
  if (!descriptor) return null;

  // Group parameters
  const groups = new Map<string, typeof descriptor.parameters[number][]>();
  for (const param of descriptor.parameters) {
    const group = param.group ?? 'General';
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(param);
  }

  return (
    <>
      {Array.from(groups.entries()).map(([groupName, params]) => (
        <div key={`${instanceId}-${groupName}`} className="param-group">
          <div className="param-group-header">{groupName}</div>
          {params.map((def) => (
            <ControlFactoryWrapper
              key={def.id}
              instanceId={instanceId}
              def={def}
              value={values[def.id] ?? def.default}
              parameterStore={parameterStore}
            />
          ))}
        </div>
      ))}
    </>
  );
}

function ControlFactoryWrapper({
  instanceId,
  def,
  value,
  parameterStore,
}: {
  instanceId: string;
  def: import('../core/types').ParameterDef;
  value: ParameterValue;
  parameterStore: ParameterStore;
}) {
  const handleChange = useCallback(
    (newValue: ParameterValue) => {
      parameterStore.setValue(instanceId, def.id, newValue);
    },
    [parameterStore, instanceId, def.id],
  );

  return <ControlFactory def={def} value={value} onChange={handleChange} />;
}
