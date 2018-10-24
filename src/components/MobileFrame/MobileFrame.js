import React from 'react';
import PercentRadii from 'containers/PercentRadii/PercentRadii';
import './MobileFrame.css';

const WebsiteFrame = props => (
  <PercentRadii className="mobileFrame" percent={8}>
    {props.render}
  </PercentRadii>
);

export default WebsiteFrame;
