import { render, h, Component } from 'ink'

// Components

import { Search } from '../components/Search'

// Helpers -------------------------------------------------------------------

const notEmpty = x => x.length > 0
const isEmpty = x => x.length === 0

// Emma ----------------------------------------------------------------------

class Emma extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      packages: [],
    }
  }

  render() {
    const { query } = this.state

    return (
      <div>
        <Search
          label="Search packages 📦 🎧  : "
          value={query}
          onChange={this.handleSearch}
        />
      </div>
    )
  }
}

// Command -------------------------------------------------------------------

export const options = {
  description: `Search and install packages and playlists.`,
  help: `
      Usage
      $ emma search

      Examples
      $ emma search

      Options
      - no options, really simple!  
   `,
  flags: {
    verbose: {
      type: 'boolean',
      alias: 'v',
      default: false,
    },
  },
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
  unmount = render(h(Emma, { onError, onExit }))
}
