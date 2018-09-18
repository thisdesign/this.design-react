import React from 'react';
import './WebsiteFrame.css';

const WebsiteFrame = (props) => {
  const circleColor = props.circleColor || '#fff';
  const frameColor = props.frameColor || '#D8D8D8';

  this.hey = React.createRef();

  return (
    <div className="websiteFrame" ref={this.hey}>
      <svg viewBox="0 0 632 20" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path fill={frameColor} d="M0 0h632v20H0z" />
        <circle fill={circleColor} cx="10" cy="10" r="3" />
        <circle fill={circleColor} cx="21" cy="10" r="3" />
        <circle fill={circleColor} cx="32" cy="10" r="3" />
      </svg>
      {props.render}
    </div>
  );
};

export default WebsiteFrame;
