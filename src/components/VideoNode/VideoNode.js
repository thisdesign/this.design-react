import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import './VideoNode.scss';

const VideoNode = ({
  url, poster, controls, muteToggle,
}) => {
  console.log({ url }, { poster }, { controls }, { muteToggle });
  return (
    <div className="videoNode" >
      <ReactPlayer
        url={url}
        playing
        loop
        muted
        playsinline
        width="100%"
        height="auto"
        className="videoNode__videoWrapper"
      />
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
