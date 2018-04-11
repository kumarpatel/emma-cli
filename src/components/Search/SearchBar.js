import { h, Text } from 'ink'
import TextInput from 'ink-text-input'

export const SearchBar = ({ label, value, onChange }) => (
  <div>
    <Text bold white>
      {label}
    </Text>
    <TextInput value={value} onChange={onChange} placeholder="..." />
  </div>
)
