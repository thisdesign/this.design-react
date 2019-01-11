import React from 'react';
import Mute from '../icons/Mute';
import './MuteControl.scss';
import { VideoContext } from '../VideoNode';


const MuteControl = () => (
  <VideoContext.Consumer>
    {({ muted, toggleMuted }) => (
      <div
        className={`videoNode__iconWrap ${muted ? '-muted' : ''}`}
        onClick={toggleMuted}
        role="button"
        tabIndex={0}
      >
        <Mute />
      </div>)}
  </VideoContext.Consumer>
);


export default MuteControl;
