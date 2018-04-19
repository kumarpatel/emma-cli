import { h, Component } from 'ink'
import PropTypes from 'prop-types'

class Package extends Component {
  static propTypes = {
    pkg: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    key: PropTypes.string,
    focus: PropTypes.bool,
  }
  static defaultProps = {
    key: 'space',
    focus: false,
  }

  constructor(props) {
    super(props)

    this.handleKeypress = this.handleKeypress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    process.stdin.on('keypress', this.handleKeypress)
  }

  componentWillUnmount() {
    process.stdin.removeListener('keypress', this.handleKeypress)
  }

  handleKeypress(ch, key) {
    if (key.name === this.props.key) {
      this.handleSubmit()
    }
  }

  handleSubmit() {
    if (this.props.focus) {
      this.props.onSubmit(this.props.pkg)
    }
  }

  render() {
    const { pkg } = this.props

    return <div />
  }
}

export { Package }
