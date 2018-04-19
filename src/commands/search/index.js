import { h, render, Component } from 'ink'
import { SearchBar } from '../../components/SearchBar'
import { Sections } from '../../components/Sections'
import { PackageSearch } from '../../components/PackageSearch'
import { PackageSuggestions } from '../../components/PackageSuggestions'

class EmmaSearch extends Component {
  state = {
    query: '',
    packages: [],
  }

  handleQueryChange = query => {
    this.setState({ query })
  }

  handleTogglePackage = pkg => {}

  render() {
    const { query, packages } = this.state

    return (
      <div>
        <SearchBar
          value={query}
          onChange={this.handleQueryChange}
          focus={true}
        />
        <Sections>
          <PackageSearch
            query={query}
            onSelect={this.handleTogglePackage}
            selected={packages}
            focus={true}
          />
          <PackageSuggestions />
        </Sections>
      </div>
    )
  }
}

// Setup

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

export async function run(flags) {
  let unmount

  const onError = () => {
    unmount()
    process.exit(1)
  }

  const onExit = () => {
    unmount()
    process.exit()
  }

  const { verbose } = flags

  unmount = render(h(EmmaSearch, { verbose, onError, onExit }))
}
