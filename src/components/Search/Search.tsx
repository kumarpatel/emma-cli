import { h, Component } from 'ink'
import { search } from '../../lib/algolia'
import { Package, Playlist } from '../../lib/install'

interface SearchProps {
  onPackageToggle: (pkg: Package) => any
}

interface SearchState {
  packages: Package[]
  playlists: Playlist[]
  loading: Status
}

type Status = 'not_loaded' | 'loading' | 'loaded' | 'error'

// Helpers

const Loading: { [status: string]: Status } = {
  NOT_LOADED: 'not_loaded',
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
}

// Search

export class Search extends Component<SearchProps, SearchState> {
  constructor(props) {
    super(props)

    this.state = {
      packages: [],
      playlists: [],
      loading: Loading.NOT_LOADED,
    }
  }

  render() {
    const { packages, playlists, loading } = this.state
    const { children, onPackageToggle } = this.props

    return (
      <>
        <div />
      </>
    )
  }

  handleSearch(query: string) {
    console.log(query)
  }
}
