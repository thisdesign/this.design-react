import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CursorContext from 'components/CursorDot/CursorContext'
import styled from 'styled-components/macro'
import Words from './Words'

const ref = React.createRef()

function CursorDotProvider({ children }) {
  const [state, setState] = useState({ icon: null, enabled: false })

  const handleMouseMove = e => {
    const transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    ref.current.style.transform = transform
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  })

  return (
    <CursorContext.Provider
      value={{
        enableFloating: () => null,
      }}
    >
      {children}
      <FloatingWrapper ref={ref}>
        <Words enabled={state.enabled} textId="work" />
      </FloatingWrapper>
    </CursorContext.Provider>
  )
}

CursorDotProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

const CURSOR_SIZE = 100

const FloatingWrapper = styled.div`
  background: blue;
  border-radius: 50%;

  height: ${CURSOR_SIZE}px;
  width: ${CURSOR_SIZE}px;
  left: ${CURSOR_SIZE / -2}px;
  top: ${CURSOR_SIZE / -2}px;
  pointer-events: none;
  position: fixed;
  z-index: 20;

  ${'' /* transition: transform $anim-fast $ease-decel; */}
`

export default React.memo(CursorDotProvider)
