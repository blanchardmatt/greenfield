import { useRef, useEffect, memo } from 'react';
import { RenderPipeline } from '../core/RenderPipeline';

interface CanvasProps {
  onPipelineReady: (pipeline: RenderPipeline) => void;
}

export const Canvas = memo(function Canvas({ onPipelineReady }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pipelineRef = useRef<RenderPipeline | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pipeline = new RenderPipeline(canvas);
    pipelineRef.current = pipeline;
    pipeline.start();
    onPipelineReady(pipeline);

    // Handle resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        pipeline.handleResize();
      }, 100);
    });
    observer.observe(canvas);

    return () => {
      clearTimeout(resizeTimer);
      observer.disconnect();
      pipeline.dispose();
      pipelineRef.current = null;
    };
  }, [onPipelineReady]);

  return <canvas ref={canvasRef} />;
});
