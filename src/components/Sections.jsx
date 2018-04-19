import { h, Component } from 'ink'
import PropTypes from 'prop-types'

class Sections extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired,
  }

  state = {
    cursor: 0,
  }

  componentDidMount() {
    process.stdin.on('keypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    process.stdin.removeListener('keypress', this.handleKeyPress)
  }

  handleKeyPress = (ch, key) => {
    const { cursor } = this.props
    const { children } = this.props

    // tab
    if (cursor < children.length) {
      this.setState(({ cursor }) => ({
        cursor: cursor + 1,
      }))
    } else {
      this.setState({ cursor: 0 })
    }
  }

  render() {
    return this.props.children
  }
}
