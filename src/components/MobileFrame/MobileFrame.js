import React from 'react';
import './MobileFrame.css';

const WebsiteFrame = props => (
  <div className="mobileFrame">
    {props.render}
  </div>
);

export default WebsiteFrame;
