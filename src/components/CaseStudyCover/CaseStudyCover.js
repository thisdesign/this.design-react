import React from 'react';
import { RichText } from 'prismic-reactjs';
import './CaseStudyCover.css';
import './imagePositions.css';

const CaseStudyCover = (props) => {
  const { color } = props.data;
  const header = props.data.header[0];
  const { image1, image2 } = header;

  const backroundImage = {
    backgroundImage: image1.url
      ? `url(${header.image1.url})`
      : null,
  };

  return (
    <div className="casestudy__cover" >
      <div className="casestudy__fill" style={{ background: color }} />
      <div className="casestudy__header">
        <div className="casestudy__header__item casestudy__header__item--title">
          {RichText.render(header.title)}
        </div>
        <div className="casestudy__header__item casestudy__header__item--description">
          {RichText.render(header.copy)}
        </div>
        <div className="casestudy__header__item casestudy__header__item--services h3">
          {header.services ? RichText.render(header.services) : null}
        </div>
      </div>
      <div className="casestudy__splash">
        <img
          className={`casestudy__splash__fr ${header.layout2}`}
          src={image2.url}
          alt={image2.alt}
          key={image2.url}
        />
        <div className="casestudy__splash__bg -cover" style={backroundImage}>
          <video autoPlay loop muted key={header.video1.url}>
            <source src={header.video1.url} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCover;
