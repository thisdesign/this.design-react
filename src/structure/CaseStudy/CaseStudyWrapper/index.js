import React, { useContext } from 'react'
import { QueueCtx } from 'structure/Root'
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
      theme={{
        isNext,
        bgColor: csData.data.background_color,
        transitioningNext: transitionName === 'NEXT_CS',
        textColor: csData.data.text_color,
      }}
    >
      <Styled.CaseStudy>{children}</Styled.CaseStudy>
    </ThemeProvider>
  )
}
