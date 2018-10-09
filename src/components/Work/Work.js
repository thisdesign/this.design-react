import React from 'react';
// import {  } from 'react-router-dom'
import { Link, withRouter } from 'react-router-dom';
import './Work.css';

/**
 * Get the caseStudyList and store it in App state
 * These links should just inherite
 *
 * @param {*} { caseStudyList }
 * @returns
 */
const Work = ({ caseStudyList, routeFromWork, history }) => {
  const links = caseStudyList.map((item) => {
    const { uid, data } = item.case_study_item;
    return (
      <a className="work__link" onClick={() => routeFromWork(history, uid)} key={uid}>
        <img className="work__link__item" src={data.thumbnail.url} alt={data.thumbnail.alt} />
        <img className="work__link__item--svg" src={data.svg.url} alt={data.svg.alt} />
      </a>
    );
  });

  return <div className="work__inner view__child">{links}</div>;
};

export default withRouter(Work);
