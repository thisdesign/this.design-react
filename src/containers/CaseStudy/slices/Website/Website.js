import React from 'react';
import PropTypes from 'prop-types';
import WebsiteFrame from 'components/WebsiteFrame/WebsiteFrame';
import VideoNode from 'components/VideoNode/VideoNode';
import './Website.scss';

const Website = ({
  layout, background, frameColor, dotColor, imageUrl, videoUrl, title,
}) => {
  const websiteInnerClasses = [
    'website__inner',
    layout === 'small' ? '-wrap--dub' : '-wrap',
    background ? '-backgroundEnabled' : '-centered',
  ].join(' ');

  return (
    <div className="website -padding" style={{ backgroundColor: background }}>
      <div className={websiteInnerClasses}>
        <WebsiteFrame frameColor={frameColor} dotColor={dotColor} >
          {videoUrl
            ? <VideoNode url={videoUrl} />
            : <img src={imageUrl} alt={title} />
           }
        </WebsiteFrame>
      </div>
    </div>
  );
};

Website.defaultProps = {
  background: null,
  imageUrl: null,
  layout: null,
  videoUrl: null,
  frameColor: null,
};

Website.propTypes = {
  videoUrl: PropTypes.string,
  background: PropTypes.string,
  imageUrl: PropTypes.string,
  layout: PropTypes.string,
  frameColor: PropTypes.string,
};

export default React.memo(Website);
