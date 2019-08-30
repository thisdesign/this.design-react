import React from 'react'
// import PropTypes from 'prop-types'
import Styled from './Styled'

function Columns({ children, reverse }) {
  return (
    <Styled.Wrap>
      <Styled.ColWrapper reverseDir={reverse}>{children}</Styled.ColWrapper>
    </Styled.Wrap>
  )
}

export const Media = ({ size, children }) => (
  <Styled.Media size={size}>{children}</Styled.Media>
)

export const Text = ({ children }) => <Styled.Text>{children}</Styled.Text>

export default Columns
