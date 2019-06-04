import React from 'react'
import PropTypes from 'prop-types'
import Iframe from './Iframe'

function Wrapper({ data }) {
  const { src, ratio, pixel_cutoff: cutoff, image } = data.primary

  return (
    <Iframe
      ratio={ratio}
      cutoff={cutoff}
      src={src.url}
      image={image.resized.url}
    />
  )
}

Wrapper.propTypes = {
  data: PropTypes.object.isRequired, //eslint-disable-line
}

export default Wrapper
