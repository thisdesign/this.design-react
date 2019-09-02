import React, { createContext, useContext } from 'react'
import { LayoutCtx, TransitionCtx } from 'structure/Layout'
import { useData } from 'structure/DataProvider'
import Hero from './Hero'
import Slices from './Slices'
import Styled from './Styled'

export const CaseStudyDataCtx = createContext()
const CSDataProvider = CaseStudyDataCtx.Provider

const CaseStudy = ({ uid }) => {
  const { ctxCaseStudies } = useData()
  const { hoveredCsUID } = useContext(LayoutCtx)
  const { isTransitioning, transitionName } = useContext(TransitionCtx)
  const getData = input => ctxCaseStudies.filter(item => item.uid === input)[0]
  const csData = getData(uid)
  const hoveredData = getData(hoveredCsUID)

  const isTransitioningFromWork = transitionName === 'FROM_WORK'
  return (
    <Styled.CaseStudy
      bg={csData.data.background_color}
      text={csData.data.text_color}
    >
      <CSDataProvider value={hoveredData || csData}>
        <Hero key={uid} />
      </CSDataProvider>
      <CSDataProvider value={csData}>
        {!isTransitioningFromWork && <Slices />}
      </CSDataProvider>
    </Styled.CaseStudy>
  )
}

export default CaseStudy
