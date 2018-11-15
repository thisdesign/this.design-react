import React from 'react';
import './Image.css';

const Image = (props) => {
  const isV2Slice = props.data.primary !== undefined;

  const data = isV2Slice // get based on v1 vs v2 api
    ? props.data.primary
    : props.data.value[0];

  const image = isV2Slice // get based on v1 vs v2 api
    ? data.image
    : data.file;

  const imageIsFullScreen = data.layout === 'fullscreen';
  const largeImageData = image.size_2560;
  let { url } = image;
  const { offset } = data;

  const classes = [
    'caseStudy__image',
    imageIsFullScreen
      ? 'caseStudy__image--fullscreen'
      : '-centered -wrap',
  ];

  if (imageIsFullScreen && largeImageData) {
    ({ url } = largeImageData);
  }

  return (
    <div className={classes.join(' ')} >
      <picture>
        {
          image.size_760 &&
            <source srcSet={image.size_760.url} media="(max-width: 600px)" />
        }
        <img src={url} alt={props.title} style={{ marginLeft: `${offset}%` }} />
      </picture>
    </div>
  );
};

export default Image;
