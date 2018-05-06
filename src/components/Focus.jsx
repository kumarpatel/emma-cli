import { h } from 'ink'
import PropTypes from 'prop-types'

const Focus = ({ focus, indicator }) => (focus ? `${indicator} ` : ' ')

Focus.propTypes = {
  focus: PropTypes.bool.isRequired,
  indicator: PropTypes.node,
}

Focus.defaultProps = {
  indicator: '>',
}

export { Focus }
