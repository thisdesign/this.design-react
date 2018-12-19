import React from 'react';
import Homepage from 'containers/Homepage/Homepage';
import CaseStudyQueue from 'containers/CaseStudyQueue/CaseStudyQueue';
import PropTypes from 'prop-types';

const Root = ({ isHome }) => {
  if (isHome) { return <Homepage />; }
  return <CaseStudyQueue />;
};

Root.propTypes = {
  isHome: PropTypes.bool.isRequired,
};
export default Root;
