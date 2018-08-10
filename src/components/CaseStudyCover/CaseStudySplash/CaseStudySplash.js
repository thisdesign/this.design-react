import React from 'react';
import './imagePositions.css';

const CaseStudySplash = (props) => {
  const {
    image1, image2, video1, video2,
  } = props.data;

  const backroundImage = {
    backgroundImage: image1.url
      ? `url(${image1.url})`
      : null,
  };

  return (
    <div className="casestudy__splash">
      <img
        className={`casestudy__splash__fr ${props.data.layout2}`}
        src={image2.url}
        alt={image2.alt}
        key={image2.url}
      />
      <video
        autoPlay
        loop
        muted
        key={video2.url}
        className={`casestudy__splash__fr ${props.data.layout2}`}
      >
        <source src={video2.url} type="video/mp4" />
      </video>
      <div className="casestudy__splash__bg -cover" style={backroundImage}>
        <video autoPlay loop muted key={video1.url}>
          <source src={video1.url} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default CaseStudySplash;
