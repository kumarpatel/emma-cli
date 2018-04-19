import { h, Component, Text } from 'ink'
import PropTypes from 'prop-types'

class Package extends Component {
  static propTypes = {
    pkg: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    key: PropTypes.string,
    focus: PropTypes.bool,
  }
  static defaultProps = {
    key: 'space',
    focus: false,
  }

  componentDidMount() {
    process.stdin.on('keypress', this.handleKeypress)
  }

  componentWillUnmount() {
    process.stdin.removeListener('keypress', this.handleKeypress)
  }

  handleKeypress = (ch, key) => {
    if (key.name === this.props.key) {
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    if (this.props.focus) {
      this.props.onSubmit(this.props.pkg)
    }
  }

  render() {
    const { focus, pkg } = this.props

    return (
      <div>
        <Text>{pkg.name}</Text>
        <Text>{pkg.humanDownloadsLast30Days}</Text>
        <Text>{pkg.owner.name}</Text>
      </div>
    )
  }
}

export { Package }
