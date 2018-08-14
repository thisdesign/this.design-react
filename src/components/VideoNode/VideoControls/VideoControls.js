import React from 'react';
import './VideoControls.css';
import MuteControl from '../MuteControl/MuteControl';

const VideoControls = (props) => {
  const control = 'videoNode__controls__control videoNode__controls__control';
  const { duration, elapsed, percentComplete } = props;
  return (
    <div className="videoNode__controls">
      <div className="videoNode__controls--progress" >
        <div className="videoNode__controls--progress__fill" style={{ width: `${percentComplete}%` }} />
      </div>

      <div className="videoNode__controls__controlWrap">
        <div className={`${control}--duration`}>
          <span> {elapsed} </span>
          <span className="-spacer" />
          <span> {duration} </span>
        </div>
        <div className={`${control}--muteToggle`}>
          <MuteControl
            isMuted={props.isMuted}
            handleMuteToggle={props.handleMuteToggle}
          />
        </div>
        <div className={`${control}--fullscreen`}>
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#FFF" strokeWidth="1.5" fill="none" >
              <path d="M1 8V1h7M13 6v7H6" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
