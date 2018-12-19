import React from 'react';
import Homepage from 'containers/Homepage/Homepage';
import Loading from 'components/Loading/Loading';
import CaseStudyQueue from 'containers/CaseStudyQueue/CaseStudyQueue';
import PropTypes from 'prop-types';

const Root = ({ isHome, projectLaunchStatus }) => {
  if (isHome) { return <Homepage />; }
  return (
    <React.Fragment>
      {projectLaunchStatus !== 'ready' && <Loading />}
      {projectLaunchStatus !== 'transitioning' && <CaseStudyQueue />}
    </React.Fragment>
  );
};

Root.propTypes = {
  isHome: PropTypes.bool.isRequired,
  projectLaunchStatus: PropTypes.string.isRequired,
};
export default React.memo(Root);
