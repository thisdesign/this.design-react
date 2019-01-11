import React from 'react';
import MuteControl from '../MuteControl/MuteControl';

const ControlBar = ({
  control, playedSeconds, duration, isMuted, toggleMuted, onClickFullScreen,
}) => {
  const Duration = () => (
    <div className={`${control}--duration`}>
      <span> {playedSeconds} </span>
      <span className="-spacer" />
      <span> {duration} </span>
    </div>
  );

  const MuteToggle = () => (
    <div className={`${control}--muteToggle`}>
      <MuteControl
        isMuted={isMuted}
        toggleMuted={toggleMuted}
      />
    </div>
  );

  const FullScreen = () => (
    <div className={`${control}--fullscreen`} onClick={onClickFullScreen}>
      <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#FFF" strokeWidth="1.5" fill="none" >
          <path d="M1 8V1h7M13 6v7H6" />
        </g>
      </svg>
    </div>
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
