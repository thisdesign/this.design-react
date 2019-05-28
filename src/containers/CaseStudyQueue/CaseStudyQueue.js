import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import CaseStudy from 'containers/CaseStudy/CaseStudy'
import { withRouter } from 'react-router-dom'
import LayoutContext from 'containers/Layout/LayoutContext'
import theme from 'styles/theme'

function CaseStudyQueue({
  history,
  openingFromHome,
  initHomeOpen,
  commitHomeOpen,
  isHome,
}) {
  const {
    caseStudies,
    currentIndex,
    nextIndex,
    unselected,
    nextUid,
  } = useContext(LayoutContext).csData

  const [isAnimating, setIsAnimating] = useState(false)
  const csTrack = unselected ? [0, null] : [currentIndex, nextIndex]

  const commitQueueChange = () => {
    history.push(`/work/${nextUid}`)
    setIsAnimating(false)
  }

  const initCsChange = () => {
    setTimeout(commitQueueChange, theme.rootTransition.duration)
    setIsAnimating(true)
  }

  return csTrack.map(
    (arrayContents, i) =>
      arrayContents !== null && (
        <CaseStudy
          key={arrayContents}
          next={i === 1}
          doc={caseStudies[arrayContents]}
          csTransitioning={isAnimating}
          {...{
            initHomeOpen,
            commitHomeOpen,
            initCsChange,
            isAnimating,
            openingFromHome,
            isHome,
          }}
        />
      )
  )
}

CaseStudyQueue.propTypes = {
  history: PropTypes.object, //eslint-disable-line
  openingFromHome: PropTypes.bool.isRequired,
  initHomeOpen: PropTypes.func.isRequired,
  commitHomeOpen: PropTypes.func.isRequired,
}

export default withRouter(CaseStudyQueue)
