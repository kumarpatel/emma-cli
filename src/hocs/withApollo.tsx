import { h, Component } from 'ink'
import { initApollo } from '../lib/apollo'
import { getAuthToken } from '../lib/conf'

export type WithApolloProps<P> = P & { apollo: any }

export const withApollo = ComposedComponent =>
  class WithApollo extends Component<any, any> {
    public apollo: any

    constructor(props) {
      super(props)
      this.apollo = initApollo(getAuthToken)
    }

    render() {
      return <ComposedComponent apollo={this.apollo} {...this.props} />
    }
  }
