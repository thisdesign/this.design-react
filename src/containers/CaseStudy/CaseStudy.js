import React from 'react';
import PropTypes from 'prop-types';
import './CaseStudy.scss';

import Styled from './styled';
import Posed from './posed';

import Partials from './partials/index';
import _getContextProps, { _contextPropTypes } from './util/_getContextProps';

const CaseStudy = ({
  doc,
  next,
  advanceQueue,
  openingFromHome,
  initHomeOpen,
  commitHomeOpen,
  isHome,
}) => {
  const customStyle = {
    textColor: doc.data.text_color,
    background: doc.data.background_color,
  };
  const alt = `${doc.data.title} - This Design - Portland OR`;
  console.log({ isHome });
  return (
    <CsContext.Provider value={{
      openingFromHome, isHome, next, ..._getContextProps(doc.data), alt,
    }}
    >
      <Posed.CaseStudy
        className="casestudy"
        onClick={initHomeOpen}
        pose={openingFromHome ? 'animatingFromHome' : 'normal'}
        onPoseComplete={commitHomeOpen}
        {...{
          next,
          openingFromHome,
          isHome,
        }}
      >
        <Styled.Inner {...customStyle}>
          <Partials.Cover isHome={isHome} data={doc.data} />
          <Partials.Body {...{ next, isHome, doc }} />
        </Styled.Inner>
        <Partials.Shim {...{ advanceQueue, isHome }} />
      </Posed.CaseStudy>
    </CsContext.Provider>
  );
};

CaseStudy.propTypes = {
  doc: PropTypes.object.isRequired, //eslint-disable-line
  next: PropTypes.bool.isRequired,
  advanceQueue: PropTypes.func.isRequired,
  openingFromHome: PropTypes.bool.isRequired,
  initHomeOpen: PropTypes.func.isRequired,
  commitHomeOpen: PropTypes.func.isRequired,
  isHome: PropTypes.bool.isRequired,
};

export const CsContext = React.createContext();
CsContext.Provider.propTypes = _contextPropTypes;

export default React.memo(CaseStudy);
