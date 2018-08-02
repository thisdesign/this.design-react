import React from 'react';
import './Video.css';

const Video = (props) => {
  const data = props.data.value[0];
  const { url } = data.file;
  const isFullScreen = data.layout === 'fullscreen';

  return (
    <video
      playsinline
      autoPlay
      loop
      muted
      className={`casestudy__video ${isFullScreen ? '-fs' : ''}`}
    >
      <source src={url} type="video/mp4" />
    </video>
  );
};

export default Video;
