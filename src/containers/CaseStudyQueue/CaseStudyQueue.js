import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import CaseStudy from 'containers/CaseStudy/CaseStudy';
import { withRouter } from 'react-router-dom';
import LayoutContext from 'containers/Layout/LayoutContext';


function CaseStudyQueue({
  // history,
  openingFromHome,
  initHomeOpen,
  commitHomeOpen,
}) {
  const {
    caseStudies,
    currentIndex,
    nextIndex,
    unselected,
    // nextUid,
  } = useContext(LayoutContext).csData;

  const [isAnimating, setIsAnimating] = useState(false);
  const csTrack = unselected ? [0, null] : [currentIndex, nextIndex];

  // const commitQueueChange = () => {
  //   history.push(`/work/${nextUid}`);
  //   setIsAnimating(false);
  // };

  // change name to initQueueChange
  const advanceQueue = () => setIsAnimating(true);

  return (
    csTrack.map((arrayContents, i) => (
      arrayContents !== null &&
        <CaseStudy
          key={arrayContents}
          next={i === 1}
          doc={caseStudies[arrayContents]}
          {...{
            initHomeOpen,
            commitHomeOpen,
            advanceQueue,
            isAnimating,
            openingFromHome,
          }}
        />
    )));
}

CaseStudyQueue.propTypes = {
  history: PropTypes.object, //eslint-disable-line
  openingFromHome: PropTypes.bool.isRequired,
  initHomeOpen: PropTypes.func.isRequired,
  commitHomeOpen: PropTypes.func.isRequired,
};


export default withRouter(CaseStudyQueue);
