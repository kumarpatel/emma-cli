declare module 'ink' {
  import {
    createElement,
    ComponentType as ReactComponentType,
    Component as ReactComponent,
    Fragment as ReactFragment,
    ComponentClass as ReactComponentClass,
  } from 'react'

  export class Component<P, S> extends ReactComponent<P, S> {}
  export class ComponentType<P> extends ReactComponentType<P> {}
  export class ComponentClass<P> extends ReactComponentClass<P> {}
  export class Fragment extends Component<{ children: Element }, {}> {}
  export class Text extends Component<any, any> {}

  export const h: typeof createElement
  export function renderToString(tree: JSX.Element): string
  export function render(tree: JSX.Element, prevTree?: JSX.Element): JSX.Element
}

declare module 'ink-spinner' {
  import { Component as ReactComponent } from 'react'

  export default class Spinner extends ReactComponent<any, any> {}
}
