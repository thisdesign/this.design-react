
import React from 'react';
import PercentRadii from 'containers/PercentRadii/PercentRadii';
import './WebsiteFrame.css';

const WebsiteFrame = (props) => {
  const { dotColor, frameColor } = props;

  return (
    <PercentRadii className="websiteFrame" percent={1}>
      <svg viewBox="0 0 632 20" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path fill={frameColor} d="M0 0h632v20H0z" />
        <circle fill={dotColor} cx="10" cy="10" r="2.75" />
        <circle fill={dotColor} cx="21" cy="10" r="2.75" />
        <circle fill={dotColor} cx="32" cy="10" r="2.75" />
      </svg>
      {props.render}
    </PercentRadii>
  );
};

WebsiteFrame.defaultProps = {
  dotColor: '#fff',
  frameColor: '#D8D8D8',
};

export default WebsiteFrame;
