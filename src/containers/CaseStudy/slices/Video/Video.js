import React from 'react';
import './Video.css';

const Video = (props) => {
  const data = props.data.value[0];
  const { url } = data.file;
  const isFullScreen = data.layout === 'fullscreen';

  return (
    <div className={`casestudy__video ${isFullScreen ? '-fs' : 'grid'}`}>
      <video
        playsInline
        autoPlay
        loop
        muted
        className="casestudy__video__node"
      >
        <source src={url} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
