import React, { createContext, useContext } from 'react'
import { LayoutCtx, TransitionCtx } from 'structure/Layout'
import { useData } from 'structure/DataProvider'
import getCSByUid from 'util/getCSByUid'
import Hero from './Hero'
import Slices from './Slices'
import Styled from './Styled'

export const CaseStudyDataCtx = createContext()

export function useCsData(uid) {
  const { ctxCaseStudies } = useData()
  return getCSByUid(ctxCaseStudies, uid)
}

const CaseStudy = ({ uid }) => {
  const { hoveredCsUID, mainRef } = useContext(LayoutCtx)
  const { transitionName } = useContext(TransitionCtx)
  const isTransitioningFromWork = transitionName === 'FROM_WORK'
  const csData = useCsData(uid)

  if (isTransitioningFromWork) {
    mainRef.current.scrollTop = 0
  }

  return (
    <Styled.CaseStudy
      bg={csData.data.background_color}
      text={csData.data.text_color}
    >
      <Hero uid={hoveredCsUID || uid} />
      {!isTransitioningFromWork && <Slices uid={uid} />}
    </Styled.CaseStudy>
  )
}

export default CaseStudy
