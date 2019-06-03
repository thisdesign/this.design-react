import React from 'react'
import PropTypes from 'prop-types'
import Styled from './Styled'
import icons from './icons'

function AttatchedCursor({ textId, enabled }) {
  return <Styled.Words enabled={enabled}>{icons[textId]}</Styled.Words>
}

export default AttatchedCursor
