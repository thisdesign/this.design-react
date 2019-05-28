import React, { useState, useContext } from 'react'
import HomepageWrapper from 'containers/Homepage/Homepage'
import { withRouter } from 'react-router-dom'
import Loading from 'components/Loading/Loading'
import CaseStudyQueue from 'containers/CaseStudyQueue/CaseStudyQueue'
import PropTypes from 'prop-types'
import LayoutContext from 'containers/Layout/LayoutContext'
import theme from 'styles/theme'

function Root({ projectLaunchStatus, history }) {
  const [openingFromHome, setOpeningFromHome] = useState(false)

  const { caseStudies, unselected } = useContext(LayoutContext).csData

  const commitHomeOpen = () => {
    history.push(`/work/${caseStudies[0].uid}`)
    setOpeningFromHome(false)
  }

  const initHomeOpen = () => {
    setOpeningFromHome(true)
    setTimeout(commitHomeOpen, theme.rootTransition.duration)
  }

  return (
    <>
      {unselected && <HomepageWrapper shim {...{ openingFromHome }} />}
      <>
        {projectLaunchStatus !== 'ready' && <Loading />}
        {projectLaunchStatus !== 'transitioning' && (
          <CaseStudyQueue
            {...{
              openingFromHome,
              initHomeOpen,
              commitHomeOpen,
            }}
          />
        )}
      </>
    </>
  )
}
Root.propTypes = {
  history: PropTypes.object.isRequired, //eslint-disable-line
  projectLaunchStatus: PropTypes.string.isRequired,
}

export default withRouter(Root)
