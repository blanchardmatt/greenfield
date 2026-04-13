import { useRef, useState, useCallback } from 'react';
import { Canvas } from './ui/Canvas';
import { ParameterPanel } from './ui/ParameterPanel';
import { EffectSelector } from './ui/EffectSelector';
import { PresetBar } from './ui/PresetBar';
import { InputDebugOverlay } from './ui/InputDebugOverlay';
import type { RenderPipeline } from './core/RenderPipeline';

export function App() {
  const pipelineRef = useRef<RenderPipeline | null>(null);
  const [activeEffects, setActiveEffects] = useState<string[]>(['noise-flow-field']);
  const [, setTick] = useState(0);

  const onPipelineReady = useCallback((pipeline: RenderPipeline) => {
    pipelineRef.current = pipeline;
    pipeline.setEffectChain(['noise-flow-field']);
    setTick((t) => t + 1);
  }, []);

  const handleEffectChange = useCallback((effectIds: string[]) => {
    setActiveEffects(effectIds);
    pipelineRef.current?.setEffectChain(effectIds);
    setTick((t) => t + 1);
  }, []);

  const pipeline = pipelineRef.current;

  return (
    <div className="app">
      <div className="canvas-area">
        <Canvas onPipelineReady={onPipelineReady} />
        <InputDebugOverlay pipeline={pipeline} />
      </div>
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Procedural Art</h1>
        </div>
        <EffectSelector
          activeEffects={activeEffects}
          onChange={handleEffectChange}
        />
        {pipeline && (
          <ParameterPanel parameterStore={pipeline.parameterStore} />
        )}
        {pipeline && (
          <PresetBar
            pipeline={pipeline}
            activeEffects={activeEffects}
            onLoadPreset={handleEffectChange}
          />
        )}
      </div>
    </div>
  );
}
