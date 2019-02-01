import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import CaseStudy from 'containers/CaseStudy/CaseStudy';
import { withRouter } from 'react-router-dom';
import LayoutContext from 'containers/Layout/LayoutContext';


function CaseStudyQueue({
  history,
  openingFromHome,
  isHome,
  handleOpen,
}) {
  const {
    caseStudies, currentIndex, nextIndex, unselected, nextUid,
  } = useContext(LayoutContext).csData;

  const [isAnimating, setIsAnimating] = useState(false);
  const csTrack = unselected ? [0, null] : [currentIndex, nextIndex];
  const _startAnimation = () => setIsAnimating(true);
  const _stopAnimation = () => setIsAnimating(false);
  const _updateUrl = (uid) => { history.push(uid); };
  const _handleTransitionEnd = () => {
    _updateUrl(`/work/${nextUid}`);
    _stopAnimation();
  };

  const advanceQueue = () => {
    _startAnimation();
    setTimeout(() => { _handleTransitionEnd(); }, 600);
  };

  return (
    csTrack.map((arrayContents, i) => (
      arrayContents !== null &&
        <CaseStudy
          key={arrayContents}
          next={i === 1}
          advanceQueue={advanceQueue}
          doc={caseStudies[arrayContents]}
          isAnimating={isAnimating || openingFromHome}
          isHome={isHome}
          handleOpen={handleOpen}
        />
    )));
}

CaseStudyQueue.propTypes = {
  history: PropTypes.object, //eslint-disable-line
  openingFromHome: PropTypes.bool.isRequired,
  isHome: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};


export default withRouter(CaseStudyQueue);
