import { useState, useEffect, useRef } from 'react';
import type { RenderPipeline } from '../core/RenderPipeline';

interface InputDebugOverlayProps {
  pipeline: RenderPipeline | null;
}

export function InputDebugOverlay({ pipeline }: InputDebugOverlayProps) {
  const [fps, setFps] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const frameTimesRef = useRef<number[]>([]);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    if (!pipeline) return;

    let rafId: number;
    const tick = () => {
      const now = performance.now();
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;

      const frameTimes = frameTimesRef.current;
      frameTimes.push(dt);
      if (frameTimes.length > 60) frameTimes.shift();

      const avgDt = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
      setFps(Math.round(1000 / avgDt));

      const input = pipeline.inputManager.poll();
      setMousePos({ x: input.mouse.x, y: input.mouse.y });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [pipeline]);

  if (!pipeline) return null;

  return (
    <div className="debug-overlay">
      FPS: {fps} | Mouse: {mousePos.x.toFixed(2)}, {mousePos.y.toFixed(2)}
    </div>
  );
}
