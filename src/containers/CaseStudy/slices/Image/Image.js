import React from 'react';
import './Image.css';

const Image = (props) => {
  const data = props.data.value[0];
  const src = data.file.url;
  const imageIsFullScreen = data.layout === 'fullscreen';

  return (
    <div className={
        `caseStudy__image ${imageIsFullScreen
          ? 'caseStudy__image--fullscreen'
          : 'grid'
        }`
      }
    >
      <img src={src} />
    </div>
  );
};

export default Image;
