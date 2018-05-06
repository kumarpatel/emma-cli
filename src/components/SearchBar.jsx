import { h, Component, Text } from 'ink'
import PropTypes from 'prop-types'
import { TextInput } from './TextInput'

const SearchBar = ({ value, focus, onChange, onSubmit }) => (
  <div>
    <div>
      <Text bold white>{`Search packages 📦  : `}</Text>
      <TextInput
        value={value}
        focus={focus}
        onChange={onChange}
        onSubmit={onSubmit}
        placeholder="..."
      />
    </div>
    <div>
      <Text>Powered by </Text>
      <Text blue>Algolia</Text>
      <Text>.</Text>
    </div>
  </div>
)

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  focus: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
}

SearchBar.defaultProps = {
  focus: false,
  onChange: () => {},
  onSubmit: () => {},
}

export { SearchBar }
