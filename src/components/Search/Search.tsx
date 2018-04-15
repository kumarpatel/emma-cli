import { h, Component } from 'ink'
import { search } from '../../lib/algolia'
import { Package, Playlist } from '../../lib/install'

export interface SearchProps {
  onPackageToggle: (pkg: Package) => any
  children: Element
}

export interface SearchState {
  packages: Package[]
  playlists: Playlist[]
  loading: Status
}

export type Status = 'not_loaded' | 'loading' | 'loaded' | 'error'

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

    return <span>ab</span>
  }

  handleSearch(query: string) {
    console.log(query)
  }
}
