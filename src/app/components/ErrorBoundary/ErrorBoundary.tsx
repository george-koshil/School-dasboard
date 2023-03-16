import { Component, ReactElement } from 'react'

class ErrorBoundary extends Component<
  { children: ReactElement; },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error(error)
  }

  render() {
    if (this.state.hasError) {


      return (
        <div>
          <h3>Oops... something went wrong</h3>
          <p>We apologise and are fixing the problem</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
