import React from 'react'
import { RichText } from 'prismic-reactjs'
// import PropTypes from 'prop-types'
import Styled from './Styled'

function Columns({ mediaRight, size, children }) {
  return (
    <Styled.Wrap>
      <Styled.ColWrapper size={size} mediaRight={mediaRight}>
        {children}
      </Styled.ColWrapper>
    </Styled.Wrap>
  )
}

const Media = ({ size, children }) => (
  <Styled.Media size={size}>{children}</Styled.Media>
)

const Text = ({ children }) => (
  <Styled.Text>{RichText.render(children)}</Styled.Text>
)

Columns.Text = Text
Columns.Media = Media

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
    <Columns mediaRight={right === 'right'} size={mediaSize}>
      <Columns.Media>{image.url && <img src={image.url} />}</Columns.Media>
      <Columns.Text>{text}</Columns.Text>
    </Columns>
  )
}
export default Columns
