import React, { useContext, memo } from 'react'

import { LayoutCtx, TransitionCtx } from 'structure/Layout'
import { QueueCtx, NextCsTrigger } from 'structure/Root'

import CaseStudyWrapper from './CaseStudyWrapper'
import Hero from './Hero'
import Slices from './Slices'
import Styled from './Styled'

const CaseStudy = memo(({ uid }) => {
  const { isNext } = useContext(QueueCtx)
  const { hoveredCsUID } = useContext(LayoutCtx)
  const { transitionName } = useContext(TransitionCtx)
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
