import React, { createContext, useContext, memo } from 'react'
import { LayoutCtx, TransitionCtx } from 'structure/Layout'
import { useData } from 'structure/DataProvider'
import getCSByUid from 'util/getCSByUid'
import { Link, withRouter } from 'react-router-dom'
import Hero from './Hero'
import Slices from './Slices'
import Styled from './Styled'

export const CaseStudyDataCtx = createContext()
const CSDataProvider = CaseStudyDataCtx.Provider

function getNextIndex(ctxCaseStudies, currentCsUid) {
  console.log(ctxCaseStudies)
  const uids = ctxCaseStudies.map(item => item.uid)
  const currentIndex = uids.indexOf(currentCsUid)
  return (currentIndex + 1) % ctxCaseStudies.length
}
//
// const CaseStudy = memo(({ uid }) => {
//   // React.useEffect(() => {
//   //   console.log('MOUNTED', uid)
//   // }, [uid])
//   const { ctxCaseStudies } = useData()
//   const { hoveredCsUID, mainRef } = useContext(LayoutCtx)
//   const { transitionName } = useContext(TransitionCtx)
//   const isTransitioningFromWork = transitionName === 'FROM_WORK'
//   const csData = getCSByUid(ctxCaseStudies, uid)
//   const hoveredData = getCSByUid(ctxCaseStudies, hoveredCsUID)
//
//   if (isTransitioningFromWork) {
//     mainRef.current.scrollTop = 0
//   }
//
//   return (
//     <>
//       <Styled.CaseStudy
//         bg={csData.data.background_color}
//         text={csData.data.text_color}
//       >
//         <CSDataProvider value={hoveredData || csData}>
//           <Hero uid={uid} />
//         </CSDataProvider>
//         <CSDataProvider value={csData}>
//           {/* {!isTransitioningFromWork && <Slices />} */}
//         </CSDataProvider>
//       </Styled.CaseStudy>
//     </>
//   )
// })

function CsTrack({ uid, history }) {
  React.useEffect(() => {
    console.log('mounted')
  }, [])
  const { ctxCaseStudies } = useData()
  const nextIndex = getNextIndex(ctxCaseStudies, uid)
  const nextCsUid = ctxCaseStudies[nextIndex].uid
  const { mainRef } = useContext(LayoutCtx)

  const change = () => {
    history.push(`/work/${nextCsUid}`)
    mainRef.current.scrollTop = 0
  }

  const uidTrack = [uid, nextCsUid]
  return (
    <div onClick={change}>
      {uidTrack.map(cs => (
        <CSDataProvider value={getCSByUid(ctxCaseStudies, cs)}>
          <Hero uid={cs} />
        </CSDataProvider>
      ))}
    </div>
  )
}

export default withRouter(CsTrack)
