import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TransitionCtx } from 'structure/Layout'
import PropTypes from 'prop-types'

function TransitionLink({ onClick, ...props }) {
  const { triggerTransition } = useContext(TransitionCtx)

  const handeClick = () => {
    triggerTransition()
    if (onClick) onClick()
  }

  return <Link {...props} onClick={handeClick} />
}

TransitionLink.defaultProps = {
  onClick: undefined,
}

TransitionLink.propTypes = {
  onClick: PropTypes.func,
}

export default TransitionLink
