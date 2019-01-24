import React from 'react';
import PropTypes from 'prop-types';
import { Indicators, Indicator } from './_blocks';

const GalleryIndicators = ({
  imageUrls, currentImageIndex, goToImage, dark,
}) => (
  <Indicators>
    <Indicators.Inner>
      <Indicator.Current index={currentImageIndex} dark={dark} />
      {imageUrls.map((img, index) => (
        <Indicator key={img} onClick={() => goToImage(index)} dark={dark} />
        ))}
    </Indicators.Inner>
  </Indicators>
);

GalleryIndicators.defaultProps = {
  dark: false,
};
GalleryIndicators.propTypes = {
  dark: PropTypes.bool,
  currentImageIndex: PropTypes.number.isRequired,
  goToImage: PropTypes.func.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GalleryIndicators;
