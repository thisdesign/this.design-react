import React from 'react';

const GalleryIndicators = (props) => {
  const indicators = props.images.map((img, index) => {
    const className = 'caseStudy__gallery__indicator';
    const indicatorClasses = (index === props.currentImageIndex)
      ? `${className} ${className}--active`
      : className;

    return (
      <div
        className={indicatorClasses}
        key={img.url}
        onClick={() => props.goToImage(index)}
      />
    );
  });
  return (
    <div className="caseStudy__gallery__indicators">
      {indicators}
    </div>
  );
};

export default GalleryIndicators;
