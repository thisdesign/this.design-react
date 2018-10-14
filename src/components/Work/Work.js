import React from 'react';
import { Link } from 'react-router-dom';
import './Work.css';

const Work = (props) => {
  const { caseStudyList } = props;
  const links = caseStudyList.map((item) => {
    const { uid, data } = item.case_study_item;

    return (
      <Link
        className="work__link"
        to={`/work/${uid}`}
        onClick={() => props.changeView('root')}
        key={uid}
      >
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
      </Link>);
  });

  return (
    <div className="work__inner view__child -wrap-nav">
      {links}
    </div>
  );
};

export default Work;
