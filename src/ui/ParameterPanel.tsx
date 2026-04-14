import { useSyncExternalStore, useCallback, useState, useEffect, useRef } from 'react';
import type { ParameterStore } from '../core/ParameterStore';
import type { ParameterValue, FloatParameterDef, IntParameterDef } from '../core/types';
import { ControlFactory } from './controls/ControlFactory';
import { CollapsibleSection } from './CollapsibleSection';

// Effect display labels (kept in sync with EffectSelector)
const EFFECT_LABELS: Record<string, string> = {
  'media-source': 'Media',
  'text-layer': 'Text Layer',
  'kinetic-type': 'Kinetic Type',
  'text-mask': 'Text Mask',
  'ascii-filter': 'ASCII Filter',
  'noise-flow-field': 'Noise Flow Field',
  'voronoi-liquid': 'Voronoi Liquid',
  'domain-warp-tunnel': 'Domain Warp',
  'kaleidoscope': 'Kaleidoscope',
  'fractal-explorer': 'Fractal Explorer',
  'raymarched-metaballs': 'Raymarched Metaballs',
  'particle-system': 'Particle System',
  'organic-vines': 'Ornamental Flourish',
  'feedback-echo': 'Feedback Echo',
  'audio-waveform': 'Audio Waveform',
  'hand-tracking': 'Hand Tracking',
};

interface ParameterPanelProps {
  parameterStore: ParameterStore;
  focusedEffectId?: string | null;
}

export function ParameterPanel({ parameterStore, focusedEffectId }: ParameterPanelProps) {
  const version = useSyncExternalStore(
    parameterStore.subscribe,
    parameterStore.getSnapshot,
  );
  void version;

  const instanceIds = parameterStore.getAllInstanceIds();

  return (
    <div className="parameter-panel">
      {instanceIds.map((instanceId) => (
        <EffectSection
          key={instanceId}
          instanceId={instanceId}
          parameterStore={parameterStore}
          focused={focusedEffectId === instanceId}
          // If no explicit focus, default to the first effect being open
          defaultOpen={focusedEffectId == null && instanceIds[0] === instanceId}
        />
      ))}
    </div>
  );
}

function EffectSection({
  instanceId,
  parameterStore,
  focused,
  defaultOpen,
}: {
  instanceId: string;
  parameterStore: ParameterStore;
  focused: boolean;
  defaultOpen: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(focused || defaultOpen);

  // When focus arrives, open + scroll into view
  useEffect(() => {
    if (focused) {
      setOpen(true);
      // Defer to next frame so layout is settled
      requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [focused]);

  const descriptor = parameterStore.getDescriptor(instanceId);
  const values = parameterStore.getValues(instanceId);

  const handleReset = useCallback(() => {
    if (!descriptor) return;
    for (const param of descriptor.parameters) {
      parameterStore.setValue(instanceId, param.id, param.default);
    }
  }, [descriptor, parameterStore, instanceId]);

  const handleRandomize = useCallback(() => {
    if (!descriptor) return;
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

  if (!descriptor) return null;

  // Group parameters by their `group` tag
  const groups = new Map<string, typeof descriptor.parameters[number][]>();
  for (const param of descriptor.parameters) {
    const group = param.group ?? 'General';
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(param);
  }

  const label = EFFECT_LABELS[instanceId] ?? descriptor.name ?? instanceId;

  return (
    <CollapsibleSection
      ref={sectionRef}
      title={label}
      open={open}
      onToggle={() => setOpen((v) => !v)}
      className={`effect-section ${focused ? 'effect-section--focused' : ''}`}
    >
      <div className="param-actions">
        <button className="btn param-action-btn" onClick={handleReset}>Reset</button>
        <button className="btn param-action-btn" onClick={handleRandomize}>Randomize</button>
      </div>
      {Array.from(groups.entries()).map(([groupName, params]) => (
        <CollapsibleSection
          key={`${instanceId}-${groupName}`}
          title={groupName}
          defaultOpen
          className="param-group-collapsible"
        >
          <div className="param-group">
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
        </CollapsibleSection>
      ))}
    </CollapsibleSection>
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

  return <ControlFactory def={def} value={value} onChange={handleChange} effectId={instanceId} />;
}
