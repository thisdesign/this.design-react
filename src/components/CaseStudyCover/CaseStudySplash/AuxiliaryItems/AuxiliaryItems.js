import React from 'react';
import isMobile from 'util/isMobile';

const AuxiliaryItems = (props) => {
  const { layout } = props;
  const { auxImage, auxVideo } = props.media;
  const auxiliaryWidth = { width: `${props.width}vw` };

  const image = (
    <img
      className={`casestudy__splash__auxiliary ${layout}`}
      src={auxImage.url}
      alt={auxImage.alt}
      key={auxImage.url}
      style={auxiliaryWidth}
    />
  );

  const video = (
    <video
      autoPlay
      loop
      muted
      key={auxVideo.url}
      style={auxiliaryWidth}
      className={`casestudy__splash__auxiliary ${layout}`}
    >
      <source src={auxVideo.url} type="video/mp4" />
    </video>
  );


  if (!isMobile()) {
    return auxVideo.url ? video : image;
  }
  return null; // mobile
};

export default AuxiliaryItems;
