import React from 'react';
import './Work.css';

const Work = (props) => {
  const { caseStudyList } = props;
  const links = caseStudyList.map((item) => {
    const { uid, data } = item.case_study_item;

    return (
      <a className="work__link" href={`#${uid}`} key={uid} onClick={() => props.handleViewChange('root')}>
        <div className="work__link__wrapper">
          <img
            className="work__link__item"
            src={data.thumbnail.url}
            alt={data.thumbnail.alt}
            nopin="nopin"
          />
          <img className="work__link__item--svg" src={data.svg.url} alt={data.svg.alt} />
        </div>
        <p className="work__link__item--title">{data.title}</p>
      </a>);
  });

  return (
    <div className="work__inner view__child -wrap-nav">
      {links}
    </div>
  );
};

export default Work;