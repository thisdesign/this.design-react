import React, { useContext } from 'react'
import { RichText } from 'prismic-reactjs'
// import PropTypes from 'prop-types'
import Cols, { Media, Text } from 'components/Columns'
import LazyImg from 'components/LazyImg'
import formatAlt from 'util/formatAlt'
import { CaseStudyDataCtx } from 'structure/CaseStudy'

function Columns() {
  return Cols
}

/* eslint-disable react/prop-types  */

Columns.CSDataWrapper = function CSDataWrapper({ data, v }) {
  const dataSource = v === 1 ? data.value[0] : data.primary

  const { audio, image, video, mobileVideo, right, layout, text } = dataSource

  // prettier-ignore
  const mediaSize = layout && layout
    .replace('-column--1of3', 'SMALL')
    .replace('-column--2of3', 'LARGE')

  return (
    <Cols reverse={right === 'right'}>
      <Media size={mediaSize}>{image.url && <Image data={image} />}</Media>
      <Text>{RichText.render(text)}</Text>
    </Cols>
  )
}

function Image({ data }) {
  return (
    <LazyImg
      src={data.url}
      // alt={formatAlt(csData.title)}
      aspect={data.dimensions.height / data.dimensions.width}
    />
  )
}

export default Columns
