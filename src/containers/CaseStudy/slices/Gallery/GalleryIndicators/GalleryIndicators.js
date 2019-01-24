import React from 'react';
import { Indicators, Indicator } from './_blocks';

const GalleryIndicators = ({ images, currentImageIndex, goToImage }) => (
  <Indicators>
    <Indicators.Inner>
      <Indicator.Current index={currentImageIndex} />
      {images.map((img, index) => (
        <Indicator key={img.url} onClick={() => goToImage(index)} />
        ))}
    </Indicators.Inner>
  </Indicators>
);

export default GalleryIndicators;
