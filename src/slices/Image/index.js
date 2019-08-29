import React, { useContext } from 'react'
import { ImgShell } from 'components/LazyImg'
import { CaseStudyDataCtx } from 'structure/CaseStudy'
import formatAlt from 'util/formatAlt'
import PropTypes from 'prop-types'

function Image({ aspect, alt, src }) {
  const img = <ImgShell {...{ aspect, alt, src }} />
  return <div>{img}</div>
}

Image.propTypes = {
  aspect: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

/* eslint-disable react/prop-types  */

Image.CSDataWrapper = function CSDataWrapper({ data }) {
  const {
    data: { title },
  } = useContext(CaseStudyDataCtx)
  const { image } = data.primary
  const { width, height } = image.dimensions
  return (
    <Image src={image.url} alt={formatAlt(title)} aspect={height / width} />
  )
}

export default Image
