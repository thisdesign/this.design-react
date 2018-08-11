import React from 'react';
import './Image.css';

const Image = (props) => {
  const data = props.data.value[0];
  const { url: src, alt } = data.file;
  const imageIsFullScreen = data.layout === 'fullscreen';
  const classes = [
    'caseStudy__image',
    imageIsFullScreen
      ? 'caseStudy__image--fullscreen'
      : '-centered -wrap',
  ];

  return (
    <div className={classes.join(' ')} >
      <img src={src} alt={alt} />
    </div>
  );
};

export default Image;
