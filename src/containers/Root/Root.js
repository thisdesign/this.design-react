import React, { useState, useContext } from 'react';
import HomepageWrapper from 'containers/Homepage/Homepage';
import { withRouter } from 'react-router-dom';
import CaseStudyQueue from 'containers/CaseStudyQueue/CaseStudyQueue';
import PropTypes from 'prop-types';
import { ApiDataCtx } from 'containers/App/App';
import { LayoutContext } from 'containers/Layout/Layout';
import theme from 'styles/theme';

function Root({ projectLaunchStatus, history }) {
  const [openingFromHome, setOpeningFromHome] = useState(false);

  const { caseStudies } = useContext(ApiDataCtx);
  const { caseStudySelected } = useContext(LayoutContext).csState;

  const commitHomeOpen = () => {
    history.push(`/work/${caseStudies[0].uid}`);
    setOpeningFromHome(false);
  };

  const initHomeOpen = () => {
    setOpeningFromHome(true);
    setTimeout(commitHomeOpen, theme.rootTransition.duration);
  };

  return (
    <>
      {!caseStudySelected && <HomepageWrapper shim {...{ openingFromHome }} />}
      <>
        {projectLaunchStatus !== 'transitioning' && (
          <CaseStudyQueue
            {...{
              openingFromHome,
              initHomeOpen,
              commitHomeOpen,
            }}
          />
        )}
      </>
    </>
  );
}
Root.propTypes = {
  history: PropTypes.object.isRequired, //eslint-disable-line
  projectLaunchStatus: PropTypes.string.isRequired,
};

export default withRouter(Root);
