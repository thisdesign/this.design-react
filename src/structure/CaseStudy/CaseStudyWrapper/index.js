import React, { useContext, memo } from 'react'
import { useSelector } from 'react-redux'
import { QueueCtx } from 'structure/Root'
import { ThemeProvider } from 'styled-components'
import useCsData from '../hooks/useCsData'
import Styled from './Styled'

const CaseStudyWrapper = memo(({ children, uid }) => {
  const csData = useCsData(uid)
  const { isNext } = useContext(QueueCtx)
  const transitionName = useSelector(state => state.transition.transitionName)

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
})

export default CaseStudyWrapper
