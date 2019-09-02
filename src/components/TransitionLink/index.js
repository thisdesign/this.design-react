import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TransitionCtx } from 'structure/Layout'
import PropTypes from 'prop-types'

function TransitionLink({ onClick, transitionName, ...props }) {
  const { triggerTransition } = useContext(TransitionCtx)

  const handeClick = () => {
    triggerTransition(transitionName)
    if (onClick) onClick()
  }

  return <Link {...props} onClick={handeClick} />
}

TransitionLink.defaultProps = {
  onClick: undefined,
  transitionName: null,
}

TransitionLink.propTypes = {
  onClick: PropTypes.func,
  transitionName: PropTypes.string,
}

export default TransitionLink
