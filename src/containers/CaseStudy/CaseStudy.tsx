import React, { useContext } from 'react'
import { LayoutContext } from 'containers/Layout/Layout'
import Head from 'components/Head'

import './CaseStudy.scss'
import Styled from './styled'
import Posed, { getPose } from './posed'
import Partials from './partials/index'
import _getContextProps, { _contextPropTypes } from './util/_getContextProps'

/**
 * Types
 */

type CaseStudyDoc = {
  uid: string
  data: {
    text_color: string
    background_color: string
    title: string
  }
}

interface IProps {
  doc: CaseStudyDoc
  next: boolean
  initCsChange: () => void
  openingFromHome: boolean
  initHomeOpen: () => void
  csTransitioning: boolean
}

interface IContextProps {
  isHome: boolean
  next: boolean
  openingFromHome: boolean
  alt: string
  csTransitioning: boolean
  meta: {
    description: string
    title: string
    image: string
  }
}

/**
 *  Component
 */

export const CsContext = React.createContext<IContextProps>({
  isHome: false,
  next: false,
  alt: '',
  meta: {
    description: '',
    title: '',
    image: '',
  },
  csTransitioning: false,
  openingFromHome: false,
})

const CaseStudy: React.FC<IProps> = ({
  doc,
  next,
  initCsChange,
  openingFromHome,
  initHomeOpen,
  csTransitioning,
}) => {
  const customStyle = {
    textColor: doc.data.text_color,
    background: doc.data.background_color,
  }
  const alt = `${doc.data.title} - This Design - Portland OR`
  const { csState } = useContext(LayoutContext)
  const isHome = !csState.caseStudySelected

  return (
    <CsContext.Provider
      value={{
        ..._getContextProps(doc.data),
        openingFromHome,
        isHome,
        next,
        alt,
        csTransitioning,
      }}
    >
      <HeadMeta />
      <Posed.CaseStudy
        className="casestudy"
        onClick={isHome ? initHomeOpen : null}
        pose={getPose({
          next,
          isHome,
          openingFromHome,
          csTransitioning,
        })}
        isShim={next || isHome}
        {...{
          next,
          openingFromHome,
          isHome,
        }}
      >
        <Styled.Inner {...customStyle}>
          <Partials.Cover />
          <Partials.Body {...{ next, isHome, doc }} />
        </Styled.Inner>
        <Partials.Shim {...{ initCsChange, isHome }} />
      </Posed.CaseStudy>
    </CsContext.Provider>
  )
}

const lineBreak = /(\r\n|\n|\r)/gm
const sanitize = (str: string) => str.replace(lineBreak, ' ')

const HeadMeta = () => {
  const { isHome, next, meta } = useContext(CsContext)
  const { currentUid } = useContext(LayoutContext).csState

  if (!isHome && !next) {
    return (
      !isHome &&
      !next && (
        <Head
          description={sanitize(meta.description)}
          title={sanitize(meta.title)}
          path={`/work/${currentUid}`}
          image={meta.image}
        />
      )
    )
  }
  return null
}

export default React.memo(CaseStudy)
