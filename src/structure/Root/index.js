import React, { useContext, createContext, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTransitionTrigger } from 'components/TransitionLink'
import CaseStudy from 'structure/CaseStudy'
import { withRouter } from 'react-router-dom'
import { useData } from 'structure/DataProvider'
import theme from 'style/theme'

function getNextCsUid(currentCsUid, ctxCaseStudies) {
  const uids = ctxCaseStudies.map(item => item.uid)
  const currentIndex = uids.indexOf(currentCsUid)
  const nextIndex = (currentIndex + 1) % ctxCaseStudies.length
  return ctxCaseStudies[nextIndex].uid
}

const Root = () => {
  const currentCsUid = useSelector(state => state.currentCsUid)
  const isHome = !currentCsUid

  return <>{isHome ? 'HOME' : <CsQueue />}</>
}

export const QueueCtx = createContext()

const CsQueue = memo(() => {
  const { ctxCaseStudies } = useData()
  const currentCsUid = useSelector(state => state.currentCsUid)
  const nextCsUid = getNextCsUid(currentCsUid, ctxCaseStudies)

  return (
    <>
      {[currentCsUid, nextCsUid].map((uid, i) => (
        <QueueCtx.Provider key={uid} value={{ nextCsUid, isNext: i === 1 }}>
          <CaseStudy uid={uid} />
        </QueueCtx.Provider>
      ))}
    </>
  )
})

export const NextCsTrigger = withRouter(
  ({ children, history, match, location, staticContext, ...props }) => {
    const { nextCsUid, isNext } = useContext(QueueCtx)
    const triggerTransition = useTransitionTrigger()

    function handleClick() {
      const cb = () => history.push(`/work/${nextCsUid}`)
      const { duration } = theme.csTransition
      const transitionName = 'NEXT_CS'
      triggerTransition(transitionName, duration, cb)
    }

    return (
      <div {...props} onClick={!isNext ? handleClick : null}>
        {children}
      </div>
    )
  }
)

// Root.propTypes = {}

export default Root
