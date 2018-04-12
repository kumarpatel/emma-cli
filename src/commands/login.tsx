import opn from 'opn'
import gql from 'graphql-tag'
import { h, render, Component, Text } from 'ink'
import Spinner from 'ink-spinner'

import { withApollo } from '../hocs/withApollo'
import { saveAuthToken } from '../lib/conf'

interface EmmaLoginProps {
  apollo: any
  onExit: () => void
  onError: (err: Error) => void
}

interface EmmaLoginState {
  status: Status
}

type Status =
  | 'TICKET_NOT_REQUESTED'
  | 'TICKET_REQUESTING'
  | 'WAITING_FOR_VERIFICATION'
  | 'AUTHENTICATED'
  | 'ERROR'

// Helpers

const Status: { [ket: string]: Status } = {
  TICKET_NOT_REQUESTED: 'TICKET_NOT_REQUESTED',
  TICKET_REQUESTING: 'TICKET_REQUESTING',
  WAITING_FOR_VERIFICATION: 'WAITING_FOR_VERIFICATION',
  AUTHENTICATED: 'AUTHENTICATED',
  ERROR: 'ERROR',
}

// GraphQL Queries and Mutations

const AUTHENTICATION_TICKET_MUTATION = gql`
  mutation Ticket {
    getAuthenticationTicket {
      url
      secret
    }
  }
`

const TICEKT_VERIFICATION_SUBSCRIPTION = gql`
  subscription Verification($secret: String!) {
    token(secret: $secret) {
      token
      user {
        id
        name
      }
    }
  }
`

// EmmaLogin -----------------------------------------------------------------

class EmmaLogin extends Component<EmmaLoginProps, EmmaLoginState> {
  constructor(props) {
    super(props)

    this.state = {
      status: Status.TICKET_NOT_REQUESTED,
    }

    this.handleTicketVerification = this.handleTicketVerification.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  async componentDidMount() {
    try {
      this.setState({
        status: Status.TICKET_REQUESTING,
      })

      // Ticket

      const res = await this.props.apollo.mutate({
        mutation: AUTHENTICATION_TICKET_MUTATION,
      })

      const { url, secret } = res.data.getAuthenticationTicket

      this.setState({
        status: Status.WAITING_FOR_VERIFICATION,
      })

      // Open URL

      opn(url)

      // Wait for verification

      this.props.apollo
        .subscribe({
          query: TICEKT_VERIFICATION_SUBSCRIPTION,
          variables: { secret },
        })
        .subscribe({
          next: this.handleTicketVerification,
          error: this.handleError,
        })
    } catch (err) {
      this.handleError(err)
    }
  }

  async handleTicketVerification(ticket) {
    try {
      const { token } = ticket.data.token

      saveAuthToken(token)

      await this.setState({ status: Status.AUTHENTICATED })

      this.props.onExit()
    } catch (err) {
      this.handleError(err)
    }
  }

  handleError(err: Error) {
    this.setState({
      status: Status.ERROR,
    })
    this.props.onError(err)
  }

  render() {
    const { status } = this.state

    return (
      <div>
        {status === Status.TICKET_NOT_REQUESTED && (
          <Text>Request Authentication Ticket.</Text>
        )}
        {status === Status.TICKET_REQUESTING && (
          <span>
            <Spinner green /> Waiting for ticket
          </span>
        )}
        {status === Status.WAITING_FOR_VERIFICATION && (
          <span>
            <Spinner blue /> Waiting for ticket verification
          </span>
        )}
        {status === Status.AUTHENTICATED && (
          <Text>🎉 You have successfully loged in!</Text>
        )}
        {status === Status.ERROR && <Text>🍄 Something went wrong.</Text>}
      </div>
    )
  }
}

// Command

export const options = {
  description: 'Login to Emma PKG.',
  help: `
      Usage
      $ emma login

      Options
      - no options, really simple!  
   `,
}

export async function run() {
  let unmount: any // eslint-disable-line prefer-const

  const onError = () => {
    unmount()
    process.exit(1)
  }

  const onExit = () => {
    unmount()
    process.exit()
  }

  // Uses `h` instead of JSX to avoid transpiling this file
  unmount = render(h(withApollo(EmmaLogin), { onError, onExit }))
}
