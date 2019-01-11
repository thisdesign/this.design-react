import React from 'react';
import PropTypes from 'prop-types';
import './VideoNode.scss';


const VideoNode = (props) => {
  console.log(props);
  return (
    <div className="videoNode" >
      <div className="videoNode__videoWrapper">
        {/* Video goes here */}
      </div>
      {/* Mute icon goes here */}
      {/* Controls go here */}
    </div>
  );
};

export default VideoNode;


VideoNode.propTypes = {
  url: PropTypes.string.isRequired,
  poster: PropTypes.string,
  controls: PropTypes.bool,
  muteToggle: PropTypes.bool,
};

VideoNode.defaultProps = {
  controls: false,
  muteToggle: false,
  poster: null,
};
