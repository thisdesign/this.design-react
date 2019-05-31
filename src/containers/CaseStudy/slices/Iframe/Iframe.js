import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from './Wrapper'
import Styled from './Styled'

const getRatioPaddingPercent = ratoString => {
  const ratioVals = ratoString.split(':').map(string => parseInt(string, 10))
  const result = (ratioVals[1] / ratioVals[0]) * 100
  const isNum = typeof result === 'number'
  return isNum ? result : null
}

function Iframe({ src, ratio }) {
  const ratioPaddingPercent = getRatioPaddingPercent(ratio)
  return (
    <Styled.Wrapper ratio={ratioPaddingPercent || 16 / 9}>
      <Styled.Iframe src={src} title="iframe" />
    </Styled.Wrapper>
  )
}

Iframe.defaultProps = {
  ratio: null,
}

Iframe.propTypes = {
  src: PropTypes.string.isRequired,
  ratio: PropTypes.string,
}

Iframe.Wrapper = Wrapper

export default Iframe
