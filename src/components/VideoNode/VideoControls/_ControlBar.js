import React from 'react';
import MuteControl from '../MuteControl/MuteControl';
import { VideoContext } from '../VideoNode';

const ControlBar = () => {
  const Item = ({ id, children, onClick }) => (
    <div className={`videoNode__controls__control videoNode__controls__control--${id}`} onClick={onClick}>{children}</div>
  );

  const Duration = () => (
    <VideoContext.Consumer>
      {({ playedSeconds, duration }) => (
        <Item id="duration">
          <span> {playedSeconds} </span>
          <span className="-spacer" />
          <span> {duration} </span>
        </Item>
      )}
    </VideoContext.Consumer>
  );

  const MuteToggle = () => (
    <Item id="muteToggle">
      <MuteControl />
    </Item>
  );

  const FullScreen = () => (
    <VideoContext.Consumer>
      {({ onClickFullScreen }) => (
        <Item id="fullscreen" onClick={onClickFullScreen}>
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#FFF" strokeWidth="1.5" fill="none" >
              <path d="M1 8V1h7M13 6v7H6" />
            </g>
          </svg>
        </Item>)}
    </VideoContext.Consumer>
  );

  return (
    <div className="videoNode__controls__controlInner">
      <Duration />
      <MuteToggle />
      <FullScreen />
    </div>
  );
};

export default ControlBar;
