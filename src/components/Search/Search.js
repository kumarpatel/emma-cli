import { h, Component } from 'ink'
import { search } from '../../lib/algolia'

// Loading Constants

const Loading = {
  NOT_LOADED: 'not_loaded',
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
}

// Search

export class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      packages: [],
      playlists: [],
      loading: Loading.NOT_LOADED,
    }
  }

  componentWillReceiveProps(props) {}

  render() {
    const { packages, playlists, loading } = this.state
    const { children, onPackageToggle } = this.props

    return (
      <>
        <div />
      </>
    )
  }

  handleSearch(query) {}
}
