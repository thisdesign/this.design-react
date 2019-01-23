import React from 'react';
import { Indicators, Indicator } from './_blocks';

const GalleryIndicators = props => (
  <Indicators>
    <Indicators.Inner>
      <Indicator.Current index={props.currentImageIndex} />
      {props.images.map((img, index) => (
        <Indicator key={img.url} onClick={() => props.goToImage(index)} />
        ))}
    </Indicators.Inner>
  </Indicators>
);

export default GalleryIndicators;
