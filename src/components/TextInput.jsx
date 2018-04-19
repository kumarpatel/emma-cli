import { h, Text, Component } from 'ink'
import PropTypes from 'prop-types'
import hasAnsi from 'has-ansi'

class TextInput extends Component {
  constructor(props) {
    super(props)

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  render({ value, placeholder }) {
    const hasValue = value.length > 0

    return <Text dim={!hasValue}>{hasValue ? value : placeholder}</Text>
  }

  componentDidMount() {
    process.stdin.on('keypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    process.stdin.removeListener('keypress', this.handleKeyPress)
  }

  handleKeyPress(ch, key) {
    if (!this.props.focus) {
      return
    }

    if (hasAnsi(key.sequence)) {
      return
    }

    const { value, onChange, onSubmit } = this.props

    if (key.name === 'return') {
      onSubmit(value)
      return
    }

    if (key.name === 'backspace') {
      onChange(value.slice(0, -1))
      return
    }

    if (
      key.name === 'space' ||
      (key.sequence === ch && /^.*$/.test(ch) && !key.ctrl)
    ) {
      onChange(value + ch)
    }
  }
}

TextInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  focus: PropTypes.bool,
}

TextInput.defaultProps = {
  value: '',
  placeholder: '',
  onChange: () => {},
  onSubmit: () => {},
  focus: true,
}

export { TextInput }
