import React from 'react'
import { RichText } from 'prismic-reactjs'
import Styled from './Styled'

function Text({ value }) {
  return <Styled.Wrapper>{RichText.render(value)}</Styled.Wrapper>
}

/* eslint-disable react/prop-types  */

Text.CSDataWrapper = function CSDataWrapper({ data }) {
  return <Text value={data.value} />
}
// Text.propTypes = {}

export default Text
