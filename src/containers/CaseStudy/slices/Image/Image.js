import React from 'react';
import './Image.css';

const Image = (props) => {
  const image = props.data.image || props.data.file; // v2 vs v1
  const imageIsFullScreen = props.data.layout === 'fullscreen';

  const largeImage = image.size_2560;

  const { title } = props;
  let { url } = image;
  const { offset } = props.data;

  const classes = [
    'caseStudy__image',
    imageIsFullScreen
      ? 'caseStudy__image--fullscreen'
      : '-centered -wrap',
  ];

  if (imageIsFullScreen && largeImage) {
    ({ url } = largeImage);
  }

  return (
    <div className={classes.join(' ')} >
      <picture>
        {
          image.size_760 &&
            <source srcSet={image.size_760.url} media="(max-width: 600px)" />
        }
        <img src={url} alt={title} style={{ marginLeft: `${offset}%` }} />
      </picture>
    </div>
  );
};

export default Image;
