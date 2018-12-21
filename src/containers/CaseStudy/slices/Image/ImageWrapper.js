import React from 'react';
import Image from './Image';

Image.Wrapper = (props) => {
  const api = props.data.value
    ? props.data.value[0] // v1 structure
    : props.data.primary; // v2 structure

  const url = api.image ? api.image.url : api.file.url;
  const { offset, position, layout } = api;
  const isFullScreen = layout === 'fullscreen';

  const mobileSize = 'size_760';
  const mobileUrl = api.image && api.image[mobileSize] && api.image[mobileSize].url;

  return (
    <Image
      offset={offset}
      position={position}
      isFullScreen={isFullScreen}
      url={url}
      mobileUrl={mobileUrl}
      {...props}
    />

  );
};

export default Image;
