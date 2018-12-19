import React from 'react';
import Homepage from 'containers/Homepage/Homepage';
import CaseStudyQueue from 'containers/CaseStudyQueue/CaseStudyQueue';
import Loading from 'components/Loading/Loading';
import PropTypes from 'prop-types';

const Root = ({
  isHome,
  isLoading,
  istransitioningToCs,
}) => {
  if (isHome) {
    return <Homepage />;
  }
  return (
    <React.Fragment>
      { isLoading && <Loading />}
      { !istransitioningToCs && <CaseStudyQueue /> }
    </React.Fragment>
  );
};

Root.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isHome: PropTypes.bool.isRequired,
  istransitioningToCs: PropTypes.bool.isRequired,
};
export default Root;
