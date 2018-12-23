import React from 'react';
import './Image.scss';

const Image = ({
  isFullScreen, offset, url, title, mobileUrl,
}) => {
  const classes = [
    'caseStudy__image',
    isFullScreen
      ? 'caseStudy__image--fullscreen'
      : '-centered -wrap',
  ];

  return (
    <div className={classes.join(' ')} >
      <picture>
        { mobileUrl &&
          <source srcSet={mobileUrl} media="(max-width: 600px)" />
        }
        <img src={url} alt={title} style={{ marginLeft: `${offset}%` }} />
      </picture>
    </div>
  );
};

export default React.memo(Image);
