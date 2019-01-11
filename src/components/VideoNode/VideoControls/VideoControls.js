import React from 'react';
import propTypes from 'prop-types';
import './VideoControls.scss';
import ControlBar from './_ControlBar';
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

  return (
    <div className={`videoNode__controls ${hasPlayed}`}>
      <PlayButton />
      <div className="videoNode__controls--wrapper">
        <Progress percentComplete={percentComplete} />
        <ControlBar
          control={control}
          playedSeconds={playedSeconds}
          duration={duration}
          isMuted={isMuted}
          toggleMuted={toggleMuted}
          onClickFullScreen={onClickFullScreen}
        />
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
