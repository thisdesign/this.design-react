import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LayoutContext from 'containers/Layout/LayoutContext';

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
}) => {
  const customStyle = {
    textColor: doc.data.text_color,
    background: doc.data.background_color,
  };
  const alt = `${doc.data.title} - This Design - Portland OR`;
  const { unselected: isHome } = useContext(LayoutContext).csData;

  return (
    <CsContext.Provider value={{
      openingFromHome, isHome, next, ..._getContextProps(doc.data), alt,
    }}
    >
      <Posed.CaseStudy
        className="casestudy"
        onClick={initHomeOpen}
        pose={openingFromHome ? 'animatingFromHome' : 'normal'}
        isShim={next || isHome}
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
};

export const CsContext = React.createContext();
CsContext.Provider.propTypes = _contextPropTypes;

export default React.memo(CaseStudy);
