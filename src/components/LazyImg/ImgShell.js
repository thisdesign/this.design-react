import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

/* eslint jsx-a11y/alt-text:0 */

const ImgShell = forwardRef(({ aspect, src, show, ...props }, ref) => {
  return (
    <Wrapper show={show} aspect={aspect}>
      <img {...props} src={show ? src : null} ref={ref} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  padding-top: ${props => props.aspect * 100}%;
  position: relative;
  opacity: ${props => (props.show ? 1 : 0)};

  /* FOR DEBUGGING */
  ${'' /* border: 1px solid ${props => (props.show ? 'green' : 'red')}; */}

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
