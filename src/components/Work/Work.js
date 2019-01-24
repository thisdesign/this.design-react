import React from 'react';
import CursorAnchor from 'components/CursorDot/CursorAnchor';
import LayoutContext from 'containers/Layout/LayoutContext';
import { Link } from 'react-router-dom';
import './Work.scss';

const Work = () => {
  const WorkThumbnail = ({
    uid, thumbnail, svg, title, launchProject,
  }) => (
    <Link
      className="work__link"
      to={`/work/${uid}`}
      key={uid}
      onClick={() => launchProject(uid)}
    >
      <div className="work__link__wrapper">
        <CursorAnchor textId="launch" detached>
          <img
            className="work__link__item"
            src={thumbnail.url}
            alt={thumbnail.alt}
            nopin="nopin"
          />
          <img
            className="work__link__item--svg"
            nopin="nopin"
            src={svg.url}
            alt={svg.alt}
          />
        </CursorAnchor>
      </div>
      <p className="work__link__item--title">{title}</p>
    </Link>
  );

  return (
    <div className="work__inner view__child -wrap-nav">
      <LayoutContext.Consumer>{
        ({
          csData,
          launchProject,
        }) => csData.caseStudies
          .map(({ uid, data: { thumbnail, svg, title } }) => (
            <WorkThumbnail
              key={uid}
              uid={uid}
              thumbnail={thumbnail}
              svg={svg}
              title={title}
              launchProject={launchProject}
            />
        ))
      }
      </LayoutContext.Consumer>
    </div>
  );
};

export default React.memo(Work);
