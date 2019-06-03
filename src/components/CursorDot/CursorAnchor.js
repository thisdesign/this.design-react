import React, { useState, useContext, forwardRef } from 'react'
import CursorContext from 'components/CursorDot/CursorContext'
import PropTypes from 'prop-types'
import Styled from './Styled'
import Words from './Words'

const CursorAnchor = ({ children, onClick, textId, detached }) => {
  const { updateCursor } = useContext(CursorContext)
  const [enabled, setEnabled] = useState(false)

  const enableCursor = () => setEnabled(true)
  const disableCursor = () => setEnabled(false)

  const handleClick = () => {
    disableCursor()
    onClick()
  }

  return (
    <Styled.Container
      onMouseEnter={enableCursor}
      onClick={handleClick}
      onMouseLeave={disableCursor}
    >
      {children}
      {!detached && <Words {...{ textId }} enabled={enabled} />}
    </Styled.Container>
  )
}

CursorAnchor.defaultProps = {
  onClick: () => null,
  detached: false,
}

CursorAnchor.propTypes = {
  detached: PropTypes.bool,
  textId: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func,
}

export default CursorAnchor
