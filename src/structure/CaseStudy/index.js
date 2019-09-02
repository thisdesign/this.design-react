import React, { useContext } from 'react'
import { LayoutCtx, TransitionCtx } from 'structure/Layout'
import useScrollTopReset from './hooks/useScrollTopReset'
import CaseStudyWrapper from './CaseStudyWrapper'
import Hero from './Hero'
import Slices from './Slices'

const CaseStudy = ({ uid, isNext }) => {
  const { hoveredCsUID } = useContext(LayoutCtx)
  const { transitionName } = useContext(TransitionCtx)
  const isTransitioningFromWork = transitionName === 'FROM_WORK'
  useScrollTopReset()

  return (
    <CaseStudyWrapper uid={uid}>
      {!isNext ? (
        <>
          <Hero uid={hoveredCsUID || uid} />
          {!isTransitioningFromWork && <Slices uid={uid} />}
        </>
      ) : (
        <Hero uid={uid} />
      )}
    </CaseStudyWrapper>
  )
}

export default CaseStudy
