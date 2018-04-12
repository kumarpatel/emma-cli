declare module 'ink' {
  import { createElement, Component as ReactComponent } from 'react'

  export class Component<Props, State> extends ReactComponent<Props, State> {}
  export class Text extends Component<any, any> {}

  export const h: typeof createElement
  export function renderToString(tree: JSX.Element): string
  export function render(tree: JSX.Element, prevTree?: JSX.Element): JSX.Element
}

declare module 'ink-spinner' {
  import { Component as ReactComponent } from 'react'

  export default class Spinner extends ReactComponent<any, any> {}
}
