import React, { createContext, useContext } from 'react'
import { LayoutCtx, TransitionCtx } from 'structure/Layout'
import { useData } from 'structure/DataProvider'
import getCSByUid from 'util/getCSByUid'
import { withRouter } from 'react-router-dom'
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

  if (isTransitioningFromWork) {
    mainRef.current.scrollTop = 0
  }

  return (
    <CaseStudyWrapper uid={uid}>
      <Hero uid={hoveredCsUID || uid} key={uid} />
      {/* {!isTransitioningFromWork && <Slices uid={uid} />} */}
    </CaseStudyWrapper>
  )
}

function CaseStudyWrapper({ children, uid }) {
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

function CsTrack({ uid, history }) {
  const { mainRef } = useContext(LayoutCtx)
  const { ctxCaseStudies } = useData()
  const uids = ctxCaseStudies.map(item => item.uid)
  const index = uids.indexOf(uid)
  const nextIndex = (index + 1) % uids.length
  const nextUid = uids[nextIndex]

  console.log(nextUid)
  return (
    <>
      <CaseStudy uid={uid} />
      <div
        onClick={() => {
          history.push(`/work/${nextUid}`)
          mainRef.current.scrollTop = 0
        }}
      >
        <Hero uid={nextUid} />
      </div>
    </>
  )
}

export default withRouter(CsTrack)
