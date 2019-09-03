import React, { useContext, memo } from 'react'
import { useSelector } from 'react-redux'

import { QueueCtx, NextCsTrigger } from 'structure/Root'

import CaseStudyWrapper from './CaseStudyWrapper'
import Hero from './Hero'
import Slices from './Slices'
import Styled from './Styled'

const CaseStudy = memo(({ uid }) => {
  const { isNext } = useContext(QueueCtx)
  const transitionName = useSelector(state => state.transition.transitionName)
  const hoveredCsUID = useSelector(state => state.hoveredCsUID)
  const isTransitioningFromWork = transitionName === 'FROM_WORK'

  return (
    <CaseStudyWrapper uid={uid}>
      {!isNext ? (
        <>
          <Styled.ColorBg>
            <Hero uid={isNext ? hoveredCsUID || uid : uid} />
            {!isTransitioningFromWork && <Slices uid={uid} />}
          </Styled.ColorBg>
          <NextCsTrigger>
            <Styled.Shim />
          </NextCsTrigger>
        </>
      ) : (
        <Styled.ColorBg>
          <Hero uid={uid} />
        </Styled.ColorBg>
      )}
    </CaseStudyWrapper>
  )
})

export default CaseStudy
