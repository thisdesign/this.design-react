import React from 'react';
import Mute from '../icons/Mute';
import './MuteControl.scss';

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

MuteControl.defaultProps = {
  isMuted: true,
};

export default MuteControl;
