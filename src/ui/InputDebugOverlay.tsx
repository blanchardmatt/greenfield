import { useState, useEffect, useRef, useCallback } from 'react';
import type { RenderPipeline } from '../core/RenderPipeline';

interface InputDebugOverlayProps {
  pipeline: RenderPipeline | null;
}

export function InputDebugOverlay({ pipeline }: InputDebugOverlayProps) {
  const [fps, setFps] = useState(0);
  const [visible, setVisible] = useState(true);
  const frameTimesRef = useRef<number[]>([]);
  const lastTimeRef = useRef(performance.now());

  const toggle = useCallback(() => setVisible((v) => !v), []);

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

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [pipeline]);

  if (!pipeline) return null;

  return (
    <div className="debug-overlay" onClick={toggle}>
      {visible ? `FPS: ${fps}` : '\u2022'}
    </div>
  );
}
