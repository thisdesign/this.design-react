import React, { useContext, createContext, memo } from 'react'
import CaseStudy from 'structure/CaseStudy'
import { LayoutCtx, TransitionCtx } from 'structure/Layout'
import { withRouter } from 'react-router-dom'
import { useData } from 'structure/DataProvider'
import theme from 'style/theme'
import { useSelector } from 'react-redux'

function getNextCsUid(currentCsUid, ctxCaseStudies) {
  const uids = ctxCaseStudies.map(item => item.uid)
  const currentIndex = uids.indexOf(currentCsUid)
  const nextIndex = (currentIndex + 1) % ctxCaseStudies.length
  return ctxCaseStudies[nextIndex].uid
}

function Root() {
  const view = useSelector(state => state.view)
  console.log({ view })

  const { currentCsUid } = useContext(LayoutCtx)
  const isHome = !currentCsUid

  return <>{isHome ? 'HOME' : <CsQueue />}</>
}

export const QueueCtx = createContext()

const CsQueue = memo(() => {
  const { ctxCaseStudies } = useData()
  const { currentCsUid } = useContext(LayoutCtx)
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

export const NextCsTrigger = memo(
  withRouter(
    ({ children, history, match, location, staticContext, ...props }) => {
      const { nextCsUid, isNext } = useContext(QueueCtx)
      const { triggerTransition } = useContext(TransitionCtx)

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
)

// Root.propTypes = {}

export default Root
