import React from 'react';
import Mute from '../icons/Mute';
import './MuteControl.css';

const MuteControl = props => (
  <div
    className={`videoNode__iconWrap ${props.isMuted ? '-muted' : ''}`}
    onClick={props.handleMuteToggle}
    role="button"
    tabIndex={0}
  >
    <Mute />
  </div>

);

export default MuteControl;
