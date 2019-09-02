import React from 'react'
import useCsData from '../hooks/useCsData'
import Styled from './Styled'

export default function CaseStudyWrapper({ children, uid }) {
  const csData = useCsData(uid)
  return (
    <Styled.CaseStudy
      bg={csData.data.background_color}
      text={csData.data.text_color}
    >
      {children}
    </Styled.CaseStudy>
  )
}
