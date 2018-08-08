import React from 'react';
import './Work.css';

const Work = (props) => {
  const { caseStudyList } = props;
  const links = caseStudyList.map((item) => {
    const { uid, data } = item.case_study_item;
    return (
      <a className="work__link" href={`#${uid}`} key={uid} onClick={() => props.handleViewChange('root')}>
        <img src={data.thumbnail.url} alt={data.thumbnail.alt} />
      </a>);
  });
  return (
    <div className="work__inner view__child">
      {links}
    </div>
  );
};

export default Work;
