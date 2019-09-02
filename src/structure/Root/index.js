import React, { useContext, createContext } from 'react'
import CaseStudy from 'structure/CaseStudy'
import { LayoutCtx } from 'structure/Layout'
import { withRouter } from 'react-router-dom'
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

const QueueCtx = createContext()

const CsQueue = () => {
  const { ctxCaseStudies } = useData()
  const { currentCsUid } = useContext(LayoutCtx)
  const nextCsUid = getNextCsUid(currentCsUid, ctxCaseStudies)

  return (
    <>
      {[currentCsUid, nextCsUid].map((uid, i) => (
        <QueueCtx.Provider key={uid} value={{ nextCsUid, isNext: i === 1 }}>
          <NextCsTrigger>
            <CaseStudy uid={uid} isNext={i === 1} />
          </NextCsTrigger>
        </QueueCtx.Provider>
      ))}
    </>
  )
}

const NextCsTrigger = withRouter(({ children, history, ...props }) => {
  const { nextCsUid, isNext } = useContext(QueueCtx)
  function handleClick() {
    history.push(`/work/${nextCsUid}`)
  }

  return (
    <div {...props} onClick={isNext ? handleClick : null}>
      {children}
    </div>
  )
})

// Root.propTypes = {}

export default Root
