import React from 'react';
import PropTypes from 'prop-types';
import './CaseStudy.scss';
import Styled from './styled';
import Partials from './partials/index';
import _getContextProps, { _contextPropTypes } from './util/_getContextProps';

const CaseStudy = ({
  doc, next, advanceQueue, isAnimating, isHome, handleOpen,
}) => {
  const customStyle = {
    textColor: doc.data.text_color,
    background: doc.data.background_color,
  };
  const alt = `${doc.data.title} - This Design - Portland OR`;
  return (
    <CsContext.Provider value={{
      isAnimating, isHome, next, ..._getContextProps(doc.data), alt,
    }}
    >
      <Styled.CaseStudy
        className="casestudy"
        onClick={isHome ? handleOpen : null}
        next={next}
        isAnimating={isAnimating}
        isHome={isHome}
      >
        <Styled.Inner {...customStyle}>
          <Partials.Cover isHome={isHome} data={doc.data} />
          <Partials.Body next={next} isHome={isHome} doc={doc} />
        </Styled.Inner>
        <Partials.Shim advanceQueue={advanceQueue} isHome={isHome} />
      </Styled.CaseStudy>
    </CsContext.Provider>
  );
};

CaseStudy.propTypes = {
  doc: PropTypes.object.isRequired, //eslint-disable-line
  next: PropTypes.bool.isRequired,
  advanceQueue: PropTypes.func.isRequired,
  isAnimating: PropTypes.bool.isRequired,
  isHome: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export const CsContext = React.createContext();
CsContext.Provider.propTypes = _contextPropTypes;

export default React.memo(CaseStudy);
