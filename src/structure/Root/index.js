import React, { useContext } from 'react'
import CaseStudy from 'structure/CaseStudy'
import { LayoutCtx } from 'structure/Layout'
import Hero from 'structure/CaseStudy/Hero'
import { useData } from 'structure/DataProvider'

function getNextCsUid(currentCsUid, ctxCaseStudies) {
  const uids = ctxCaseStudies.map(item => item.uid)
  const currentIndex = uids.indexOf(currentCsUid)
  const nextIndex = (currentIndex + 1) % ctxCaseStudies.length
  return ctxCaseStudies[nextIndex].uid
}

function Root() {
  const { currentCsUid } = useContext(LayoutCtx)
  const isHome = !currentCsUid

  return <>{isHome ? 'HOME' : <CsQueue />}</>
}

function CsQueue() {
  const { ctxCaseStudies } = useData()
  const { currentCsUid } = useContext(LayoutCtx)
  const nextCsUid = getNextCsUid(currentCsUid, ctxCaseStudies)

  return (
    <>
      <CaseStudy uid={currentCsUid} />
      <Hero uid={nextCsUid} />
    </>
  )
}
// Root.propTypes = {}

export default Root
