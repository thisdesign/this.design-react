import React from 'react';
import PropTypes from 'prop-types';

const ResponsiveImage = ({ mobileSrc, src, alt }) => (
  <picture>
    { mobileSrc &&
      <source srcSet={mobileSrc} media="(max-width: 600px)" />
    }
    <img {...{ src }} alt={alt} />
  </picture>
);

ResponsiveImage.propTypes = {
  mobileSrc: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ResponsiveImage;
