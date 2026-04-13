import { useRef, useState, useCallback } from 'react';
import { Canvas } from './ui/Canvas';
import { ParameterPanel } from './ui/ParameterPanel';
import { EffectSelector } from './ui/EffectSelector';
import { PresetBar } from './ui/PresetBar';
import { Toolbar } from './ui/Toolbar';
import { InputDebugOverlay } from './ui/InputDebugOverlay';
import type { RenderPipeline } from './core/RenderPipeline';

export function App() {
  const pipelineRef = useRef<RenderPipeline | null>(null);
  const [activeEffects, setActiveEffects] = useState<string[]>(['noise-flow-field']);
  const [, setTick] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((v) => !v);
  }, []);

  const pipeline = pipelineRef.current;

  return (
    <div className="app">
      <div className="canvas-area">
        <Canvas onPipelineReady={onPipelineReady} />
        <InputDebugOverlay pipeline={pipeline} />
        <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
          {sidebarOpen ? '\u2715' : '\u2630'}
        </button>
      </div>
      {sidebarOpen && <div className="sidebar-backdrop" onClick={toggleSidebar} />}
      <div className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
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
          <Toolbar pipeline={pipeline} />
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
