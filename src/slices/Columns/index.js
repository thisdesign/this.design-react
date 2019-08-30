import React from 'react'
import { RichText } from 'prismic-reactjs'
// import PropTypes from 'prop-types'
import Columns, { Media, Text } from 'components/Columns'

/* eslint-disable react/prop-types  */

Columns.CSDataWrapper = function CSDataWrapper({ data, v }) {
  const dataSource = v === 1 ? data.value[0] : data.primary

  const { audio, image, video, mobileVideo, right, layout, text } = dataSource

  // prettier-ignore
  const mediaSize = layout && layout
    .replace('-column--1of3', 'SMALL')
    .replace('-column--2of3', 'LARGE')

  console.log(image)

  return (
    <Columns reverse={right === 'right'}>
      <Media size="LARGE">{image.url && <img src={image.url} alt="" />}</Media>
      <Text>{RichText.render(text)}</Text>
    </Columns>
  )
}
export default Columns
