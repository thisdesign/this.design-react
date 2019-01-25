import React from 'react';
import Gallery from './HooksGallery';
/* eslint-disable react/prop-types */

Gallery.Wrapper = ({ data }) => {
  const api = data.value
    ? data.value // v1 structure
    : data.items; // v2 structure

  const _images = api.map(img => img.image);
  const _ratios = _images.map(image => image.dimensions.height / image.dimensions.width);
  const imageUrls = _images.map(img => img.url);
  const animate = data.primary && data.primary.zoom_animation_enabled === 'true';
  const ratio = Math.min(..._ratios) * 100;

  return (
    <Gallery animate={!(!animate)} imageUrls={imageUrls} ratio={ratio} />
  );
};

export default Gallery;
