import React from 'react'
import LazyImg from 'components/LazyImg'
import formatAlt from 'util/formatAlt'
import PropTypes from 'prop-types'
import Wrap from 'components/Wrap'

function Image({ aspect, alt, src, fullScreen }) {
  const img = <LazyImg {...{ aspect, alt, src }} />
  return fullScreen ? img : <Wrap>{img}</Wrap>
}

Image.defaultProps = {
  fullScreen: false,
}

Image.propTypes = {
  aspect: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool,
}

/* eslint-disable react/prop-types  */

Image.CSDataWrapper = function CSDataWrapper({ data, v1 }) {
  const datasrc = v1 ? data.value[0] : data.primary
  const image = v1 ? datasrc.file : datasrc.image
  const { offset, layout } = datasrc

  const { width, height } = image.dimensions

  return (
    <Image
      src={image.url}
      fullScreen={layout === 'fullscreen'}
      // alt={formatAlt(title)}
      aspect={height / width}
    />
  )
}

export default Image
