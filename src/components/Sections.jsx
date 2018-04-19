import { h, Component } from 'ink'
import PropTypes from 'prop-types'

class Sections extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      cursor: 0,
    }

    this.handleKeypress = this.handleKeypress.bind(this)
  }

  componentDidMount() {
    process.stdin.on('keypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    process.stdin.removeListener('keypress', this.handleKeyPress)
  }

  handleKeyPress(ch, key) {
    // tab
  }

  render() {
    return this.props.children
  }
}
