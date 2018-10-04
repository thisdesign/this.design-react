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
        to={`work/${uid}`}
        key={uid}
        onClick={() => props.handleViewChange('root')}
      >
        <img className="work__link__item" src={data.thumbnail.url} alt={data.thumbnail.alt} />
        <img className="work__link__item--svg" src={data.svg.url} alt={data.svg.alt} />
      </Link>
    );
  });
  return <div className="work__inner view__child">{links}</div>;
};

export default Work;
