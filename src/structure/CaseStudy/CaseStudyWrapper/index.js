import React, { useContext } from 'react'
import { NextCsTrigger, QueueCtx } from 'structure/Root'
import { TransitionCtx } from 'structure/Layout'
import { ThemeProvider } from 'styled-components'
import useCsData from '../hooks/useCsData'
import Styled from './Styled'

export default function CaseStudyWrapper({ children, uid }) {
  const csData = useCsData(uid)
  const { isNext } = useContext(QueueCtx)
  const { transitionName } = useContext(TransitionCtx)

  return (
    <ThemeProvider
      theme={{ isNext, transitioningNext: transitionName === 'NEXT_CS' }}
    >
      <Styled.CaseStudy
        as={NextCsTrigger}
        bg={csData.data.background_color}
        text={csData.data.text_color}
      >
        {children}
      </Styled.CaseStudy>
    </ThemeProvider>
  )
}
