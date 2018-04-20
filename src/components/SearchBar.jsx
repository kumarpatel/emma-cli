import { h, Component, Text } from 'ink'
import PropTypes from 'prop-types'
import { TextInput } from '../components/TextInput'

const SearchBar = ({ value, focus, onChange }) => (
  <div>
    <Text bold white>{`Search packages 📦  : `}</Text>
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
