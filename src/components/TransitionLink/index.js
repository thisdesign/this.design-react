import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import useTransitionTrigger from './useTransitionTrigger'

function TransitionLink({ onClick, transitionName, ...props }) {
  const triggerTransition = useTransitionTrigger()

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

export { useTransitionTrigger }
export default TransitionLink
