import { h, Component } from 'ink'
import { getAuthToken } from '../lib/conf'
import { initApollo } from '../lib/apollo'

export const withApollo = ComposedComponent => class WithApollo extends Component {
   constructor(props) {
      super(props)

      this.apollo = initApollo({
         getToken: getAuthToken
      })
   }

   render() {
      return (
         <ComposedComponent apollo={this.apollo} {...this.props}/>
      )
   }
}
