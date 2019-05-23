import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ApiDataCtx } from 'containers/App/App';
import CaseStudy from 'containers/CaseStudy/CaseStudy';
import useCsChange from './useCsChange';
import useCsTrack from './useCsTrack';

function CaseStudyQueue({
  history,
  openingFromHome,
  initHomeOpen,
  commitHomeOpen,
  isHome,
}) {
  const { caseStudies, caseStudyUids } = useContext(ApiDataCtx);
  const { isAnimating, initCsChange } = useCsChange({ history });
  const csTrack = useCsTrack();

  return csTrack.map(
    (uid, i) =>
      uid !== null && (
        <CaseStudy
          key={uid}
          next={i === 1}
          doc={caseStudies[caseStudyUids.indexOf(uid)]}
          csTransitioning={isAnimating}
          {...{
            initHomeOpen,
            commitHomeOpen,
            initCsChange,
            isAnimating,
            openingFromHome,
            isHome,
          }}
        />
      )
  );
}

CaseStudyQueue.propTypes = {
  history: PropTypes.object, //eslint-disable-line
  openingFromHome: PropTypes.bool.isRequired,
  initHomeOpen: PropTypes.func.isRequired,
  commitHomeOpen: PropTypes.func.isRequired,
};

export default withRouter(CaseStudyQueue);
