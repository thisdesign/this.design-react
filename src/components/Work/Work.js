import React from 'react';
import { Link } from 'react-router-dom';
import './Work.css';

const getCaseStudyList = ctx =>
  // const fetchLinks = ['casestudy.title', 'casestudy.thumbnail', 'casestudy.svg'];

  // ctx.api
  //   .getByUID('context', 'home', { fetchLinks })
  //   .then(doc => (doc ? doc.data.case_study_list : null));
  null;
const Work = ({ prismicCtx }) => {
  console.log('prismicCtx ', prismicCtx);
  // if the prismicCtx is set, get the case study list from the api
  const caseStudyList = prismicCtx ? getCaseStudyList(prismicCtx) : [];
  console.log('caseStudyList ', caseStudyList);
  const links = caseStudyList.map((item) => {
    const { uid, data } = item.case_study_item;
    return (
      <Link
        className="work__link"
        to={`work/${uid}`}
        key={uid}
        // onClick={() => props.handleViewChange('root')}
      >
        <img className="work__link__item" src={data.thumbnail.url} alt={data.thumbnail.alt} />
        <img className="work__link__item--svg" src={data.svg.url} alt={data.svg.alt} />
      </Link>
    );
  });

  return <div className="work__inner view__child">{links}</div>;
};

export default Work;
