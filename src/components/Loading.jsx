import { h, Component } from 'ink'
import PropTypes from 'prop-types'
import Spinner from 'ink-spinner'

export const Loading = Component => ({ loading, ...props }) => (
  <div>
    {loading && <Spinner />}
    {!loading && <Component {...props} />}
  </div>
)
