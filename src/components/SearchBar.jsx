import { h, Component } from 'ink'
import PropTypes from 'prop-types'
import TextInput from 'ink-text-input'

const SearchBar = ({ value, focus, onChange }) => (
  <div>
    <Text>Serch packages: </Text>
    <TextInput
      value={value}
      focus={focus}
      onChange={onChange}
      placeholder="..."
    />
  </div>
)

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  focus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

SearchBar.defaultProps = {
  focus: false,
}

export { SearchBar }
