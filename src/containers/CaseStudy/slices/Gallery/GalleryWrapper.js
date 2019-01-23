import React from 'react';
import Gallery from './Gallery';

Gallery.Wrapper = ({ data, title }) => {
  const api = data.value
    ? data.value // v1 structure
    : data.items; // v2 structure

  const images = api.map(img => img.image);
  const animate = data.primary && data.primary.zoom_animation_enabled === 'true';

  return (
    <Gallery animate={animate} images={images} title={title} />
  );
};

export default Gallery;
