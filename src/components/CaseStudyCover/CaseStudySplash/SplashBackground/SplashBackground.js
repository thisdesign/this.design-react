import React from 'react';

const SplashBackground = ({ image, video, backgroundColor }) => {
  const backroundImage = {
    backgroundImage: image
      ? `url(${image.url})`
      : null,
    backgroundColor,
  };

  return (
    <div className="casestudy__splash__bg -cover" style={backroundImage}>
      {(video && video.url) &&
        <video autoPlay loop muted key={video.url}>
          <source src={video.url} type="video/mp4" />
        </video>
      }
    </div>
  );
};

export default SplashBackground;
