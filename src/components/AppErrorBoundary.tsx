import { Component, type ErrorInfo, type ReactNode } from 'react'

type AppErrorBoundaryProps = {
  children: ReactNode
}

type AppErrorBoundaryState = {
  hasError: boolean
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App crashed:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            background: '#07172b',
            color: '#dfeaff',
            padding: '1rem',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          <div style={{ maxWidth: '44rem', textAlign: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '1.6rem' }}>Site hit an error</h1>
            <p style={{ marginTop: '0.8rem', opacity: 0.92 }}>
              Refresh once. If it still fails, clear site storage in browser settings and try again.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

