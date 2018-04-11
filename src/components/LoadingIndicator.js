import { h } from 'ink'
import Spinner from 'ink-spinner'

export const LoadingIndicator = ({ children, ...props }) => (
  <span>
    <Spinner {...props}>{children}</Spinner>
  </span>
)
