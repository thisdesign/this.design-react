import React from 'react';
import { RichText } from 'prismic-reactjs';
import Columns from './Columns';

Columns.Wrapper = ({ data }) => {
  const api = data.value
    ? data.value[0] // v1 structure
    : data.primary; // v2 structure

  const getSize = () => {
    switch (api.layout) {
      case '-column--2of3':
        return 'large';
      case '-column--1of3':
      case '-website':
      case '-mobile':
        return 'small';
      default:
        return null;
    }
  };

  const getImageUrl = () => {
    const idealSize = 'size_1024';
    return api.image[idealSize]
      ? api.image[idealSize].url
      : api.image.url;
  };

  return (
    <Columns
      isRight={api.right === 'right'}
      type="columns"
      text={RichText.render(api.text)}
      size={getSize()}
      layout={api.layout}
      videoUrl={api.video.url}
      hasMute={api.audio !== null}
      imageUrl={getImageUrl()}
    />);
};

export default Columns;
