import React from 'react';
import PropTypes from 'prop-types';
import Mute from '../icons/Mute';
import './MuteControl.scss';


const MuteControl = ({ isMuted, toggleMuted }) => (
  <div
    className={`videoNode__iconWrap ${isMuted ? '-muted' : ''}`}
    onClick={toggleMuted}
    role="button"
    tabIndex={0}
  >
    <Mute />
  </div>
);

MuteControl.propTypes = {
  isMuted: PropTypes.bool.isRequired,
  toggleMuted: PropTypes.func.isRequired,
};

export default MuteControl;
