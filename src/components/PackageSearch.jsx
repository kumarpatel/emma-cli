import { h, Component } from 'ink'
import PropTypes from 'prop-types'

const Status = {
  NOT_REQUESTED: 'not_requested',
  LOADING: 'loading',
  OBTAINED: 'obtained',
  ERROR: 'errr',
}

class PackageSearch extends Component {
  static propTypes = {
    query: PropTypes.string,
    limit: PropTypes.number,
    focus: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
  }

  static defaultProps = {
    query: '',
    limit: 5,
    focus: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      cursor: 0,
      status: Status.NOT_REQUESTED,
      packages: [],
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    process.stdin.on('keypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    process.stdin.removeListener('keypress', this.handleKeyPress)
  }

  handleKeyPress(ch, key) {}

  render() {
    return <div />
  }
}

export { PackageSearch }
