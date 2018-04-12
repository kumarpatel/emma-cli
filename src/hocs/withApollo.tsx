import { h, Component } from 'ink'
import { getAuthToken } from '../lib/conf'
import { initApollo } from '../lib/apollo'

interface ApolloComponentProps {
  apollo: any
  [key: string]: any
}

export const withApollo = (ComposedComponent: typeof Component) =>
  class WithApollo extends Component<ApolloComponentProps, any> {
    apollo: any

    constructor(props) {
      super(props)

      this.apollo = initApollo(getAuthToken)
    }

    render() {
      return <ComposedComponent apollo={this.apollo} {...this.props} />
    }
  }
