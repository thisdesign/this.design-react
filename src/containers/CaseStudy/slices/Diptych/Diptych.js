import React from 'react';
import isMobile from 'util/isMobile';
import './Diptych.scss';

const Diptych = ({ images }) => {
  const Image = ({ url, title, offset }) => (
    <div className="casestudy__diptych__item -padding">
      {url &&
        <img
          src={url}
          alt={title}
          style={{ transform: `translateX(${offset}%)` }}
        />
      } {
        // If no image, put a spacer in except on mobile
        !url && !isMobile() && <div className="casestudy__diptych__spacer" />
      }
    </div>
  );

  const Images = () => (
    images.map(({ url, title, offset }) => (
      <Image key={url} url={url} title={title} offset={!isMobile() ? offset : null} />
    ))
  );

  return (
    <div className="-grid -wrap casestudy__diptych">
      <Images />
    </div>
  );
};

export default React.memo(Diptych);
