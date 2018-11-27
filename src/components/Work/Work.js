import React from 'react';
import CursorAnchor from 'components/CursorDot/CursorAnchor';
import { Link } from 'react-router-dom';
import './Work.css';

const Work = ({ caseStudies, openCaseStudy }) => {
  const links = caseStudies.map((item) => {
    const { uid, data } = item;

    return (
      <Link
        className="work__link"
        to={`/work/${uid}`}
        onClick={() => openCaseStudy(uid)}
        key={uid}
      >
        <div className="work__link__wrapper">
          <CursorAnchor textId="launch" detached>
            <img
              className="work__link__item"
              src={data.thumbnail.url}
              alt={data.thumbnail.alt}
              nopin="nopin"
            />
            <img
              className="work__link__item--svg"
              nopin="nopin"
              src={data.svg.url}
              alt={data.svg.alt}
            />
          </CursorAnchor>
        </div>
        <p className="work__link__item--title">{data.title}</p>
      </Link>
    );
  });

  return (
    <div className="work__inner view__child -wrap-nav">
      {links}
    </div>
  );
};

export default React.memo(Work);
