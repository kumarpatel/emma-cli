import { h, Component, ComponentType, ComponentClass } from 'ink'
import { ApolloClient } from 'apollo-client'
import { initApollo } from '../lib/apollo'
import { getAuthToken } from '../lib/conf'

export type WithApolloProps<P> = P & { apollo: ApolloClient<any> }

// export function withApollo<ComposedComponentProps>(
//   ComposedComponent: ComponentType<WithApolloProps<ComposedComponentProps>>,
// ): ComponentClass<ComposedComponentProps> {
//   class WithApollo extends Component<ComposedComponentProps, {}> {
//     apollo: ApolloClient<any>

//     constructor(props) {
//       super(props)
//       this.apollo = initApollo(getAuthToken)
//     }

//     render() {
//       return <ComposedComponent apollo={this.apollo} {...this.props} />
//     }
//   }

//   return WithApollo
// }

export function withApollo(ComposedComponent) {
  class WithApollo extends Component<any, any> {
    apollo: ApolloClient<any>

    constructor(props) {
      super(props)
      this.apollo = initApollo(getAuthToken)
    }

    render() {
      return <ComposedComponent apollo={this.apollo} {...this.props} />
    }
  }

  return ComposedComponent
}
