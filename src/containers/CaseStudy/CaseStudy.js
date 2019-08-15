import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { LayoutContext } from 'containers/Layout/Layout'
import Head from 'components/Head'

import './CaseStudy.scss'
import Styled from './styled'
import Posed, { getPose } from './posed'
import Partials from './partials/index'
import _getContextProps, { _contextPropTypes } from './util/_getContextProps'

export const CsContext = React.createContext()

const CaseStudy = ({
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
  const { caseStudySelected } = useContext(LayoutContext).csState
  const isHome = !caseStudySelected

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
          <Partials.Cover data={doc.data} />
          <Partials.Body {...{ next, isHome, doc }} />
        </Styled.Inner>
        <Partials.Shim {...{ initCsChange, isHome }} />
      </Posed.CaseStudy>
    </CsContext.Provider>
  )
}

const lineBreak = /(\r\n|\n|\r)/gm
const sanitize = str => str.replace(lineBreak, ' ')

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

CaseStudy.propTypes = {
  doc: PropTypes.object.isRequired, //eslint-disable-line
  next: PropTypes.bool.isRequired,
  initCsChange: PropTypes.func.isRequired,
  openingFromHome: PropTypes.bool.isRequired,
  initHomeOpen: PropTypes.func.isRequired,
  csTransitioning: PropTypes.bool.isRequired,
}

CsContext.Provider.propTypes = _contextPropTypes

export default React.memo(CaseStudy)
