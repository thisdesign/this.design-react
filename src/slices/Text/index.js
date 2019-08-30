import React from 'react'
import { RichText } from 'prismic-reactjs'
import Styled from './Styled'
/* eslint-disable react/prop-types  */

function Text({ value }) {
  return <Styled.Wrapper>{RichText.render(value)}</Styled.Wrapper>
}

Text.CSDataWrapper = function CSDataWrapper({ data }) {
  return <Text value={data.value} />
}

export default Text
