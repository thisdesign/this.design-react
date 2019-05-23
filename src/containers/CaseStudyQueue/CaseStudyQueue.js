import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import theme from 'styles/theme';
import { ApiDataCtx } from 'containers/App/App';
import { LayoutContext } from 'containers/Layout/Layout';
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

  const { caseStudies, contextCaseStudies } = useContext(ApiDataCtx);
  const { inContext, currentUid } = useContext(LayoutContext).csState;

  console.log();

  const { csTrack, nextUid } = useCtx();

  const commitQueueChange = () => {
    history.push(`/work/${nextUid}`);
    setIsAnimating(false);
  };

  const initCsChange = () => {
    setTimeout(commitQueueChange, theme.rootTransition.duration);
    setIsAnimating(true);
  };

  if (inContext) {
    return csTrack.map(
      (arrayContents, i) =>
        arrayContents !== null && (
          <CaseStudy
            key={arrayContents}
            next={i === 1}
            doc={contextCaseStudies[arrayContents]}
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
  return (
    <CaseStudy
      doc={caseStudies[caseStudies.map(cs => cs.uid).indexOf(currentUid)]}
      csTransitioning={false}
      {...{
        initHomeOpen,
        commitHomeOpen,
        initCsChange,
        isAnimating,
        openingFromHome,
        isHome,
      }}
    />
  );
}

CaseStudyQueue.propTypes = {
  history: PropTypes.object, //eslint-disable-line
  openingFromHome: PropTypes.bool.isRequired,
  initHomeOpen: PropTypes.func.isRequired,
  commitHomeOpen: PropTypes.func.isRequired,
};

export default withRouter(CaseStudyQueue);
