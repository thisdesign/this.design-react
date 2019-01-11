import React from 'react';
import propTypes from 'prop-types';
import './VideoControls.scss';
import MuteControl from '../MuteControl/MuteControl';
import Play from '../icons/Play';

const VideoControls = (props) => {
  const control = 'videoNode__controls__control videoNode__controls__control';
  const {
    duration, playedSeconds, percentComplete, handleFullScreen,
  } = props;

  const hasPlayed = props.hasPlayed && !props.isPaused ? '-enabled' : '';
  const isPaused = props.isPaused ? '-isPaused' : '';

  return (
    <div className={`videoNode__controls ${hasPlayed}`}>
      <div className={`videoNode__controls__play ${isPaused}`}>
        <Play />
      </div>
      <div className="videoNode__controls--wrapper">
        <Progress percentComplete={percentComplete} />
        <div className="videoNode__controls__controlInner">
          <div className={`${control}--duration`}>
            <span> {playedSeconds} </span>
            <span className="-spacer" />
            <span> {duration} </span>
          </div>
          <div className={`${control}--muteToggle`}>
            <MuteControl
              isMuted={props.isMuted}
              handleMuteToggle={props.handleMuteToggle}
            />
          </div>
          <div className={`${control}--fullscreen`} onClick={handleFullScreen}>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#FFF" strokeWidth="1.5" fill="none" >
                <path d="M1 8V1h7M13 6v7H6" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const Progress = ({ percentComplete }) => (
  <div className="videoNode__controls--progress" >
    <div className="videoNode__controls--progress__fill" style={{ width: `${percentComplete}%` }} />
  </div>
);

VideoControls.propTypes = {
  duration: propTypes.number.isRequired,
  playedSeconds: propTypes.number.isRequired,
  percentComplete: propTypes.number.isRequired,
  handleFullScreen: propTypes.func.isRequired,
  isPaused: propTypes.bool.isRequired,
  hasPlayed: propTypes.bool.isRequired,
  isMuted: propTypes.bool.isRequired,
};

export default VideoControls;
