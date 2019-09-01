import React, { forwardRef, useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

/* eslint jsx-a11y/alt-text:0 */

const ImgShell = forwardRef(({ aspect, src, show, ...props }, ref) => {
  const [isLoaded, toggleLoaded] = useState(false)
  const setIsLoaded = () => toggleLoaded(true)

  return (
    <Wrapper show={show} aspect={aspect} ref={ref} isLoaded={isLoaded}>
      <img {...props} src={show ? src : null} onLoad={setIsLoaded} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  padding-top: ${props => props.aspect * 100}%;
  position: relative;
  transition: 300ms opacity ${props => props.theme.ease.standard};
  opacity: ${props => (props.isLoaded && props.show ? 1 : 0)};

  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

ImgShell.propTypes = {
  show: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  aspect: PropTypes.number.isRequired,
}

export default ImgShell
