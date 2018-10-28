import React from 'react';

const GalleryIndicators = (props) => {
  const indicators = props.images.map((img, index) => (
    <div
      className="caseStudy__gallery__indicator"
      key={img.url}
      onClick={() => props.goToImage(index)}
    />
  ));

  const currentIndicator = (
    <div
      className="caseStudy__gallery__indicator caseStudy__gallery__indicator--current"
      style={{ transform: `translate3d(${props.currentImageIndex * 100}%, 0, 0)` }}
    />
  );

  return (
    <div className="caseStudy__gallery__indicators">
      <div className="caseStudy__gallery__indicators__inner">
        {currentIndicator}
        {indicators}
      </div>
    </div>
  );
};

export default GalleryIndicators;
