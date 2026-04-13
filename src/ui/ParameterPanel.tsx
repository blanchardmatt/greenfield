import { useSyncExternalStore, useCallback } from 'react';
import type { ParameterStore } from '../core/ParameterStore';
import type { ParameterValue, FloatParameterDef, IntParameterDef } from '../core/types';
import { ControlFactory } from './controls/ControlFactory';

interface ParameterPanelProps {
  parameterStore: ParameterStore;
}

export function ParameterPanel({ parameterStore }: ParameterPanelProps) {
  const version = useSyncExternalStore(
    parameterStore.subscribe,
    parameterStore.getSnapshot,
  );

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

  const handleReset = useCallback(() => {
    for (const param of descriptor.parameters) {
      parameterStore.setValue(instanceId, param.id, param.default);
    }
  }, [descriptor, parameterStore, instanceId]);

  const handleRandomize = useCallback(() => {
    for (const param of descriptor.parameters) {
      let newValue: ParameterValue = param.default;
      switch (param.type) {
        case 'float': {
          const fp = param as FloatParameterDef;
          newValue = Math.random() * (fp.max - fp.min) + fp.min;
          break;
        }
        case 'int': {
          const ip = param as IntParameterDef;
          newValue = Math.floor(Math.random() * (ip.max - ip.min + 1)) + ip.min;
          break;
        }
        case 'bool':
          newValue = Math.random() > 0.5;
          break;
        case 'color':
          newValue = [Math.random(), Math.random(), Math.random(), 1.0] as [number, number, number, number];
          break;
        case 'enum': {
          const opts = param.options;
          newValue = opts[Math.floor(Math.random() * opts.length)]!.value;
          break;
        }
      }
      parameterStore.setValue(instanceId, param.id, newValue);
    }
  }, [descriptor, parameterStore, instanceId]);

  // Group parameters
  const groups = new Map<string, typeof descriptor.parameters[number][]>();
  for (const param of descriptor.parameters) {
    const group = param.group ?? 'General';
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(param);
  }

  return (
    <>
      <div className="param-actions">
        <button className="btn param-action-btn" onClick={handleReset}>
          Reset
        </button>
        <button className="btn param-action-btn" onClick={handleRandomize}>
          Randomize
        </button>
      </div>
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
