import { useState, useEffect, useRef } from 'react';
import type { RenderPipeline } from '../core/RenderPipeline';

interface InputDebugOverlayProps {
  pipeline: RenderPipeline | null;
  visible: boolean;
}

export function InputDebugOverlay({ pipeline, visible }: InputDebugOverlayProps) {
  const [info, setInfo] = useState({
    fps: 0,
    minFps: 0,
    resW: 0,
    resH: 0,
    mouseX: 0,
    mouseY: 0,
    chainLen: 0,
    time: 0,
  });
  const frameTimesRef = useRef<number[]>([]);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    if (!pipeline || !visible) return;

    let rafId: number;
    const tick = () => {
      const now = performance.now();
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;

      const frameTimes = frameTimesRef.current;
      frameTimes.push(dt);
      if (frameTimes.length > 60) frameTimes.shift();

      const avgDt = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
      const maxDt = Math.max(...frameTimes);
      const input = pipeline.inputManager.poll();

      setInfo({
        fps: Math.round(1000 / avgDt),
        minFps: Math.round(1000 / maxDt),
        resW: pipeline.canvas.width,
        resH: pipeline.canvas.height,
        mouseX: input.mouse.x,
        mouseY: input.mouse.y,
        chainLen: pipeline.getActiveEffectIds().length,
        time: pipeline.clock.time,
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [pipeline, visible]);

  if (!pipeline || !visible) return null;

  const fpsColor = info.fps >= 50 ? '#0f0' : info.fps >= 30 ? '#ff0' : '#f55';

  return (
    <div className="debug-overlay">
      <div style={{ color: fpsColor }}>
        FPS {info.fps} <span style={{ color: '#666' }}>(min {info.minFps})</span>
      </div>
      <div>{info.resW}\u00d7{info.resH}</div>
      <div>Mouse {info.mouseX.toFixed(2)}, {info.mouseY.toFixed(2)}</div>
      <div>Chain {info.chainLen} layer{info.chainLen === 1 ? '' : 's'}</div>
      <div style={{ color: '#666' }}>t {info.time.toFixed(1)}s</div>
    </div>
  );
}
