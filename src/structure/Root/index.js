import React, { useContext } from 'react'
import CaseStudy from 'structure/CaseStudy'
import { LayoutCtx } from 'structure/Layout'

function Root() {
  const { currentCsUid } = useContext(LayoutCtx)
  const isHome = !currentCsUid

  return <>{isHome ? 'HOME' : <CaseStudy uid={currentCsUid} />}</>
}

// Root.propTypes = {}

export default Root
