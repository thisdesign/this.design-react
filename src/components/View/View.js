import React from 'react'
import PropTypes from 'prop-types'
import Styled from './Styled'

const View = ({ view: activeView, viewName, children, aside }) => {
  return (
    <Styled.View
      isActive={activeView === viewName}
      {...{ viewName, aside, activeView }}
    >
      {children}
    </Styled.View>
  )
}

View.defaultProps = {
  aside: false,
  children: null,
}

View.propTypes = {
  // current app view
  view: PropTypes.string.isRequired,
  // what to call the current view
  viewName: PropTypes.string.isRequired,
  aside: PropTypes.bool,
  children: PropTypes.any,
}

export default View
