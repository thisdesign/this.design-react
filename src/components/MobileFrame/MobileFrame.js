import React from 'react';
import PropTypes from 'prop-types';
import PercentRadii from 'containers/PercentRadii/PercentRadii';
import './MobileFrame.scss';

const MobileFrame = props => (
  <PercentRadii className="mobileFrame" percent={10}>
    {props.children}
  </PercentRadii>
);

MobileFrame.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MobileFrame;
