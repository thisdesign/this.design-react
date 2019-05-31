import React from 'react'
import PropTypes from 'prop-types'
import Iframe from './Iframe'

function Wrapper({ data }) {
  const { src, ratio } = data.primary
  return <Iframe ratio={ratio} src={src.url} />
}

Wrapper.propTypes = {
  data: PropTypes.object.isRequired, //eslint-disable-line
}

export default Wrapper
