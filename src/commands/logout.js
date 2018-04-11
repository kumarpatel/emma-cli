import { h, render, Component, Text } from 'ink'
import Spinner from 'ink-spinner'

import { resetAuthToken, getAuthToken } from '../lib/conf'

// Emma Logout

const Status = {
  DETERMINING_AUTH: 'DETERMINING_AUTH',
  AUTHENTICATED: 'AUTHENTICATED',
  NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
  LOGGED_OUT: 'LOGGED_OUT',
  ERROR: 'ERROR',
}

class EmmaLogout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: Status.DETERMINING_AUTH,
    }
  }

  async componentDidMount() {
    try {
      const token = getAuthToken()

      if (!token) {
        await this.setState({ status: Status.NOT_AUTHENTICATED })
        this.props.onExit()
      }

      await this.setState({ status: Status.AUTHENTICATED })

      resetAuthToken()

      await this.setState({ status: Status.LOGGED_OUT })

      this.props.onExit()
    } catch (err) {
      await this.setState({ status: Status.ERROR })

      this.props.onError(err)
    }
  }

  render() {
    const { status } = this.state

    return (
      <div>
        {status === Status.DETERMINING_AUTH && (
          <span>
            <Spinner red /> Hmm, checking your status
          </span>
        )}
        {status === Status.AUTHENTICATED && (
          <span>
            <Spinner blue /> Logging you out
          </span>
        )}
        {status === Status.NOT_AUTHENTICATED && (
          <Text>You must first login! 😉</Text>
        )}
        {status === Status.LOGGED_OUT && (
          <Text>You have been logged out! 🎉</Text>
        )}
        {status === Status.ERROR && <Text>Something went wrong.</Text>}
      </div>
    )
  }
}

// Command

export const options = {
  description: 'Logout from Emma PKG.',
  help: `
      Usage
      $ emma logout

      Options
      - no options, really simple!  
   `,
}

export async function run() {
  let unmount // eslint-disable-line prefer-const

  const onError = () => {
    unmount()
    process.exit(1)
  }

  const onExit = () => {
    unmount()
    process.exit()
  }

  // Uses `h` instead of JSX to avoid transpiling this file
  unmount = render(h(EmmaLogout, { onError, onExit }))
}
