import React from 'react';
import isMobile from 'util/isMobile';
import AuxiliaryItems from './AuxiliaryItems/AuxiliaryItems';
import SplashBackground from './SplashBackground/SplashBackground';
import './imagePositions.scss';
import './CaseStudySplash.scss';


const CaseStudySplash = ({ data }) => {
  const media = {
    backgroundImage: data.image1,
    backgroundVideo: data.video1,
    auxImage: data.image2,
    auxVideo: data.video2,
    mobileImage: data.mobileImage,
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
        width={data.floating_media_width}
        layout={data.layout2}
      />
      <SplashBackground
        image={media.backgroundImage}
        video={media.backgroundVideo}
        backgroundColor={data.preload_background_color}
      />
    </div>
  );
};

export default CaseStudySplash;
