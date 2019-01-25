import React from 'react';
import sizeCheck from 'util/sizeCheck';
import { RichText } from 'prismic-reactjs';
import CaseStudySplash from './CaseStudySplash/CaseStudySplash';
import './CaseStudyCover.scss';

const CaseStudyCover = (props) => {
  const { color } = props.data;
  const header = props.data.header[0];
  [header.video1, header.video2].forEach(file => sizeCheck({ ...file }, 5));

  return (
    <div className="casestudy__cover" >
      <div className="casestudy__fill" style={{ background: color }} />
      <div className="casestudy__header -wrap-nav">
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
      <CaseStudySplash data={header} />
    </div>
  );
};

export default React.memo(CaseStudyCover);
