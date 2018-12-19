import React from 'react';
import WebsiteFrame from 'components/WebsiteFrame/WebsiteFrame';
import VideoNode from 'components/VideoNode/VideoNode';
import './Website.css';

const Website = (props) => {
  const { data } = props;
  const {
    frame_color: frameColor,
    dot_color: dotColor,
    background,
    screenshot,
    layout,
    video,
  } = data.primary;

  const classes = [
    'website__inner',
    layout === 'small' ? '-wrap--dub' : '-wrap',
    background ? '-backgroundEnabled' : '-centered',
  ].join(' ');


  return (
    <div className="website -padding" style={{ backgroundColor: background }}>
      <div className={classes}>
        <WebsiteFrame
          frameColor={frameColor}
          dotColor={dotColor}
          render={
            video.url ? (
              <VideoNode url={video.url} />
            ) : (
              <img src={screenshot.url} alt={props.title} />
          )}
        />
      </div>
    </div>
  );
};

export default React.memo(Website);
