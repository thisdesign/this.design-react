import React from 'react';
import './Image.css';

const Image = (props) => {
  const data = props.data.value[0];
  const { url: src } = data.file;
  const { title } = props;
  const imageIsFullScreen = data.layout === 'fullscreen';
  const classes = [
    'caseStudy__image',
    imageIsFullScreen
      ? 'caseStudy__image--fullscreen'
      : '-centered -wrap',
  ];

  return (
    <div className={classes.join(' ')} >
      <img src={src} alt={title} />
    </div>
  );
};

export default Image;
