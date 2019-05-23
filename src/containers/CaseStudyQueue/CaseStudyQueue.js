import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import theme from 'styles/theme';
import { ApiDataCtx } from 'containers/App/App';
import CaseStudy from 'containers/CaseStudy/CaseStudy';
import useCtx from './useCtx';

function CaseStudyQueue({
  history,
  openingFromHome,
  initHomeOpen,
  commitHomeOpen,
  isHome,
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  const { caseStudies } = useContext(ApiDataCtx);
  const { csTrack, nextUid } = useCtx();

  const commitQueueChange = () => {
    history.push(`/work/${nextUid}`);
    setIsAnimating(false);
  };

  const initCsChange = () => {
    setTimeout(commitQueueChange, theme.rootTransition.duration);
    setIsAnimating(true);
  };

  return csTrack.map(
    (arrayContents, i) =>
      arrayContents !== null && (
        <CaseStudy
          key={arrayContents}
          next={i === 1}
          doc={caseStudies[arrayContents]}
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
