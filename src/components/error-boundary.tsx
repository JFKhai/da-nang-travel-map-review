'use client'

import { Component, type ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from 'primereact/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Có thể thêm logging service ở đây (Sentry, LogRocket, etc.)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    // Reload trang để đảm bảo state sạch
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-4 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
              <p className="text-gray-600">
                {this.state.error?.message || 'An unexpected error occurred. Please try again.'}
              </p>
              <div className="w-full">
                <Button label="Try again" onClick={this.handleReset} severity="danger" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
