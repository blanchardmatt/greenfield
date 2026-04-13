import { useState, useCallback, useRef } from 'react';
import type { RenderPipeline } from '../core/RenderPipeline';

interface ToolbarProps {
  pipeline: RenderPipeline;
}

export function Toolbar({ pipeline }: ToolbarProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [midiOn, setMidiOn] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleScreenshot = useCallback(() => {
    const canvas = pipeline.canvas;
    // Need to render one frame with preserveDrawingBuffer behavior
    // Use toBlob from the canvas
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `procedural-art-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }, [pipeline]);

  const handleRecord = useCallback(() => {
    if (isRecording) {
      // Stop recording
      recorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    // Start recording
    const canvas = pipeline.canvas;
    const stream = canvas.captureStream(60);
    const recorder = new MediaRecorder(stream, {
      mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm',
      videoBitsPerSecond: 8_000_000,
    });
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `procedural-art-${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
      chunksRef.current = [];
    };

    recorder.start(100);
    recorderRef.current = recorder;
    setIsRecording(true);
  }, [isRecording, pipeline]);

  const handleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      pipeline.canvas.parentElement?.requestFullscreen();
    }
  }, [pipeline]);

  const toggleAudio = useCallback(async () => {
    if (audioOn) {
      pipeline.inputManager.disableAudio();
      setAudioOn(false);
    } else {
      await pipeline.inputManager.enableAudio();
      setAudioOn(pipeline.inputManager.audioEnabled);
    }
  }, [audioOn, pipeline]);

  const toggleMIDI = useCallback(async () => {
    if (midiOn) {
      pipeline.inputManager.disableMIDI();
      setMidiOn(false);
    } else {
      await pipeline.inputManager.enableMIDI();
      setMidiOn(pipeline.inputManager.midiEnabled);
    }
  }, [midiOn, pipeline]);

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <label>Inputs</label>
        <div className="toolbar-buttons">
          <button
            className={`btn toolbar-btn ${audioOn ? 'btn-active' : ''}`}
            onClick={toggleAudio}
            title="Toggle microphone input"
          >
            {audioOn ? 'Mic ON' : 'Mic'}
          </button>
          <button
            className={`btn toolbar-btn ${midiOn ? 'btn-active' : ''}`}
            onClick={toggleMIDI}
            title="Toggle MIDI input"
          >
            {midiOn ? 'MIDI ON' : 'MIDI'}
          </button>
        </div>
      </div>
      <div className="toolbar-group">
        <label>Export</label>
        <div className="toolbar-buttons">
          <button className="btn toolbar-btn" onClick={handleScreenshot} title="Save screenshot">
            Photo
          </button>
          <button
            className={`btn toolbar-btn ${isRecording ? 'btn-recording' : ''}`}
            onClick={handleRecord}
            title={isRecording ? 'Stop recording' : 'Record video'}
          >
            {isRecording ? 'Stop' : 'Record'}
          </button>
        </div>
      </div>
      <div className="toolbar-group">
        <div className="toolbar-buttons">
          <button className="btn toolbar-btn" onClick={handleFullscreen} title="Toggle fullscreen">
            Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
}
