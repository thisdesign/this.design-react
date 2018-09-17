import React from 'react';
import isMobile from 'util/isMobile';
import AuxiliaryItems from './AuxiliaryItems/AuxiliaryItems';
import SplashBackground from './SplashBackground/SplashBackground';
import './imagePositions.css';
import './CaseStudySplash.css';


const CaseStudySplash = (props) => {
  const media = {
    backgroundImage: props.data.image1,
    backgroundVideo: props.data.video1,
    auxImage: props.data.image2,
    auxVideo: props.data.video2,
    mobileImage: props.data.mobileImage,
  };


  if (isMobile() && media.mobileImage.url) {
    return (
      <div className="casestudy__splash" >
        <SplashBackground image={media.mobileImage} />
      </div>);
  }
  return (
    <div className="casestudy__splash">
      <AuxiliaryItems
        media={media}
        width={props.data.floating_media_width}
        layout={props.data.layout2}
      />
      <SplashBackground image={media.backgroundImage} video={media.backgroundVideo} />
    </div>
  );
};

export default CaseStudySplash;
