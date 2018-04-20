import { h, Component, Text, Fragment } from 'ink'
import PropTypes from 'prop-types'

import { Focus } from './Focus'

class Sections extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
      }).isRequired
    ).isRequired,
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
    const { cursor } = this.state
    const { children } = this.props

    if (key.name !== 'tab') {
      return
    }

    // tab
    if (cursor < children.length - 1) {
      this.setState(({ cursor }) => ({
        cursor: cursor + 1,
      }))
    } else {
      this.setState({ cursor: 0 })
    }
  }

  render() {
    const { cursor } = this.state

    return (
      <span>
        {this.props.children.map(({ name, component }, i) => (
          <div>
            <div>
              <Focus focus={cursor === i} />
              <Text yellow={cursor === i}>{name}</Text>
            </div>
            {component({ focus: cursor === i })}
          </div>
        ))}
      </span>
    )
  }
}

export { Sections }
