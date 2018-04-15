declare module 'ink' {
  import { createElement, Component as ReactComponent } from 'react'

  interface ComponentLifecycle<P, S, SS = never> {
    componentDidMount?(): void
    shouldComponentUpdate?(
      nextProps: Readonly<P>,
      nextState: Readonly<S>,
      nextContext: any,
    ): boolean
    componentWillUnmount?(): void
    componentDidCatch?(error: Error, errorInfo: ErrorInfo): void
  }

  export class Component<P, S> {}
  export class Text extends Component<any, any> {}

  export const h: typeof createElement
  export function renderToString(tree: JSX.Element): string
  export function render(tree: JSX.Element, prevTree?: JSX.Element): JSX.Element
}

declare module 'ink-spinner' {
  import { Component } from 'ink'

  export default class extends Component<any, any> {}
}

declare module 'opn' {
  export default (url: string) => any
}
