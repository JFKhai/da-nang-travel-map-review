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
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-4 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
              <h1 className="text-2xl font-bold">Something went wrong</h1>
              <p className="text-muted-foreground">
                {this.state.error?.message || 'An unexpected error occurred. Please try again.'}
              </p>
              <Button onClick={this.handleReset} className="w-full">
                Try again
              </Button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
