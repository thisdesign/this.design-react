import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LayoutContext } from 'containers/Layout/Layout';

import './CaseStudy.scss';
import Styled from './styled';
import Posed, { getPose } from './posed';
import Partials from './partials/index';
import _getContextProps, { _contextPropTypes } from './util/_getContextProps';

const CaseStudy = ({ doc, next, openingFromHome, csTransitioning }) => {
  const customStyle = {
    textColor: doc.data.text_color,
    background: doc.data.background_color,
  };
  const alt = `${doc.data.title} - This Design - Portland OR`;
  const { caseStudySelected } = useContext(LayoutContext).csState;
  const isHome = !caseStudySelected;

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
      <Posed.CaseStudy className="casestudy">
        <Styled.Inner {...customStyle}>
          <Partials.Cover data={doc.data} />
          <Partials.Body {...{ next, isHome, doc }} />
        </Styled.Inner>
      </Posed.CaseStudy>
    </CsContext.Provider>
  );
};

CaseStudy.propTypes = {
  doc: PropTypes.object.isRequired, //eslint-disable-line
  next: PropTypes.bool.isRequired,
  initCsChange: PropTypes.func.isRequired,
  openingFromHome: PropTypes.bool.isRequired,
  initHomeOpen: PropTypes.func.isRequired,
  csTransitioning: PropTypes.bool.isRequired,
};

export const CsContext = React.createContext();
CsContext.Provider.propTypes = _contextPropTypes;

export default React.memo(CaseStudy);
