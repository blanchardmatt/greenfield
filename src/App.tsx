import { useRef, useState, useCallback, useEffect } from 'react';
import { Canvas } from './ui/Canvas';
import { ParameterPanel } from './ui/ParameterPanel';
import { EffectSelector } from './ui/EffectSelector';
import { PresetBar } from './ui/PresetBar';
import { Toolbar } from './ui/Toolbar';
import { InputDebugOverlay } from './ui/InputDebugOverlay';
import { ErrorBoundary } from './ui/ErrorBoundary';
import { CollapsibleSection } from './ui/CollapsibleSection';
import type { RenderPipeline } from './core/RenderPipeline';
import { getEffectIds } from './effects';

function readHashState(): { effects?: string[]; params?: Record<string, Record<string, unknown>> } | null {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return null;
    return JSON.parse(decodeURIComponent(hash));
  } catch {
    return null;
  }
}

export function App() {
  const pipelineRef = useRef<RenderPipeline | null>(null);
  const [activeEffects, setActiveEffects] = useState<string[]>(['noise-flow-field']);
  const [, setTick] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shuffleActive, setShuffleActive] = useState(false);
  const shuffleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onPipelineReady = useCallback((pipeline: RenderPipeline) => {
    pipelineRef.current = pipeline;

    // Check URL hash for shared state
    const hashState = readHashState();
    if (hashState?.effects) {
      pipeline.setEffectChain(hashState.effects);
      setActiveEffects(hashState.effects);
      // Apply params after a tick
      if (hashState.params) {
        setTimeout(() => {
          for (const [eid, vals] of Object.entries(hashState.params!)) {
            pipeline.parameterStore.setValues(eid, vals as Record<string, import('./core/types').ParameterValue>);
          }
        }, 0);
      }
    } else {
      pipeline.setEffectChain(['noise-flow-field']);
    }

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

  // Share current state via URL hash
  const handleShare = useCallback(() => {
    const pipeline = pipelineRef.current;
    if (!pipeline) return;
    const state = {
      effects: activeEffects,
      params: pipeline.parameterStore.serialize(),
    };
    const hash = encodeURIComponent(JSON.stringify(state));
    window.location.hash = hash;
    navigator.clipboard?.writeText(window.location.href).then(() => {
      // Could show a toast, but keeping it simple
    });
  }, [activeEffects]);

  // Shuffle mode — auto-cycle effects
  const toggleShuffle = useCallback(() => {
    setShuffleActive((active) => {
      if (active) {
        if (shuffleTimerRef.current) clearInterval(shuffleTimerRef.current);
        shuffleTimerRef.current = null;
        return false;
      } else {
        const allIds = getEffectIds();
        shuffleTimerRef.current = setInterval(() => {
          const randomId = allIds[Math.floor(Math.random() * allIds.length)]!;
          setActiveEffects([randomId]);
          pipelineRef.current?.setEffectChain([randomId]);
          setTick((t) => t + 1);
        }, 8000);
        return true;
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      if (shuffleTimerRef.current) clearInterval(shuffleTimerRef.current);
    };
  }, []);

  const pipeline = pipelineRef.current;

  return (
    <div className="app">
      <div className="canvas-area">
        <ErrorBoundary>
          <Canvas onPipelineReady={onPipelineReady} />
        </ErrorBoundary>
        <InputDebugOverlay pipeline={pipeline} />
        <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
          {sidebarOpen ? '\u2715' : '\u2630'}
        </button>
      </div>
      {sidebarOpen && <div className="sidebar-backdrop" onClick={toggleSidebar} />}
      <div className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <h1>Procedural Art</h1>
          <div className="header-actions">
            <button
              className={`btn header-btn ${shuffleActive ? 'btn-active' : ''}`}
              onClick={toggleShuffle}
              title="Auto-cycle through effects"
            >
              {shuffleActive ? 'Stop' : 'Shuffle'}
            </button>
            <button className="btn header-btn" onClick={handleShare} title="Copy shareable link">
              Share
            </button>
          </div>
        </div>
        <CollapsibleSection title="Effect" defaultOpen>
          <EffectSelector
            activeEffects={activeEffects}
            onChange={handleEffectChange}
          />
        </CollapsibleSection>
        {pipeline && (
          <CollapsibleSection title="Parameters" defaultOpen>
            <ParameterPanel parameterStore={pipeline.parameterStore} />
          </CollapsibleSection>
        )}
        {pipeline && (
          <CollapsibleSection title="Inputs & Export" defaultOpen={false}>
            <Toolbar pipeline={pipeline} />
          </CollapsibleSection>
        )}
        {pipeline && (
          <CollapsibleSection title="Presets" defaultOpen={false}>
            <PresetBar
              pipeline={pipeline}
              activeEffects={activeEffects}
              onLoadPreset={handleEffectChange}
            />
          </CollapsibleSection>
        )}
      </div>
    </div>
  );
}
