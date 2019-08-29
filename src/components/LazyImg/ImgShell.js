import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function ImgShell({ aspect, src, alt, ...props }) {
  return (
    <Wrapper hasSrc={!!src} aspect={aspect}>
      <img {...props} src={src} alt={alt} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: ${props => props.aspect * 100}%;
  position: relative;
  opacity: ${props => (props.hasSrc ? 1 : 0)};

  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

ImgShell.defaultProps = {
  src: undefined,
}

ImgShell.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  aspect: PropTypes.number.isRequired,
}
