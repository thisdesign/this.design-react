import React from 'react';
import propTypes from 'prop-types';
import './VideoControls.scss';
import MuteControl from '../MuteControl/MuteControl';
import Play from '../icons/Play';

const VideoControls = (props) => {
  const control = 'videoNode__controls__control videoNode__controls__control';
  const {
    duration,
    playedSeconds,
    percentComplete,
    onClickFullScreen,
    isMuted,
    toggleMuted,
  } = props;

  const hasPlayed = props.hasPlayed && !props.isPaused ? '-enabled' : '';
  const isPaused = props.isPaused ? '-isPaused' : '';

  const PlayButton = () => (
    <div className={`videoNode__controls__play ${isPaused}`}>
      <Play />
    </div>
  );

  const ControlBar = () => {
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

  return (
    <div className={`videoNode__controls ${hasPlayed}`}>
      <PlayButton />
      <div className="videoNode__controls--wrapper">
        <Progress percentComplete={percentComplete} />
        <ControlBar />
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
  onClickFullScreen: propTypes.func.isRequired,
  isPaused: propTypes.bool.isRequired,
  hasPlayed: propTypes.bool.isRequired,
  isMuted: propTypes.bool.isRequired,
  toggleMuted: propTypes.func.isRequired,
};

export default VideoControls;
