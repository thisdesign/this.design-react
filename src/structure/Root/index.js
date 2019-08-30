import React, { useContext } from 'react'
import CaseStudy from 'structure/CaseStudy'
import { LayoutCtx } from 'structure/Layout'

function Root() {
  const { hoveredCs, currentCsUid } = useContext(LayoutCtx)
  const isHome = !currentCsUid

  return (
    <>
      {isHome ? (
        'HOME'
      ) : (
        <CaseStudy
          key={hoveredCs || currentCsUid}
          uid={hoveredCs || currentCsUid}
        />
      )}
    </>
  )
}

// Root.propTypes = {}

export default Root
