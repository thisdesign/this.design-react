import React from 'react';
import VideoNode from 'components/VideoNode/VideoNode';
import sizeCheck from 'util/sizeCheck';
import './Video.css';

const Video = (props) => {
  const data = props.data.value[0];
  const { url } = data.file;
  const isFullScreen = data.layout === 'fullscreen';
  const videoHasAudio = data.audio === 'true';
  const videoHasControls = data.autoplay !== 'autoplay';
  const poster = data.poster.url;
  sizeCheck({ ...data.file }, 7);

  return (
    <div className={`casestudy__video ${isFullScreen ? '-fs' : '-wrap'}`}>
      <VideoNode
        muteToggle={videoHasAudio}
        controls={videoHasControls}
        url={url}
        poster={poster}
      />
    </div>
  );
};

export default Video;
