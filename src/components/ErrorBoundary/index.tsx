import React, { ReactNode } from 'react'

type propType = {
  children: ReactNode
}
interface StateType {
  hasError: boolean
}
export default class ErrorBoundary extends React.Component<propType, StateType> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染可以显示错误提示
    return { hasError: true }
  }

  componentDidCatch(_error, info) {
    // Example "componentStack":
    // at UntrustedComponent
    // at ErrorBoundary
    // at div
    // at App
    console.log('info.componentStack', info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return <div>子组件渲染错误。</div>
    }

    return this.props.children
  }
}
