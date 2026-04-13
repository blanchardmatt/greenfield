import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { hasError: boolean; error: string | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: '#0a0a0f', color: '#ff6666', textAlign: 'center',
          zIndex: 1000, padding: 20, fontFamily: 'inherit',
        }}>
          <div>
            <h2 style={{ fontSize: 18, marginBottom: 8 }}>Rendering Error</h2>
            <p style={{ fontSize: 12, color: '#aaa', maxWidth: 400 }}>
              {this.state.error}
            </p>
            <button className="btn" onClick={() => window.location.reload()}
              style={{ marginTop: 16 }}>
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
