import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ApiDataCtx } from 'containers/App/App';
import { LayoutContext } from 'containers/Layout/Layout';
import CursorAnchor from 'components/CursorDot/CursorAnchor';
import { Link } from 'react-router-dom';
import './Work.scss';

function Work() {
  const { contextCaseStudies } = useContext(ApiDataCtx);
  const { launchProject } = useContext(LayoutContext);

  return (
    <div className="work__inner view__child -wrap-nav">
      {contextCaseStudies.map(({ uid, data: { thumbnail, svg, title } }) => (
        <WorkThumbnail
          key={uid}
          uid={uid}
          thumbnail={thumbnail}
          svg={svg}
          title={title}
          launchProject={launchProject}
        />
      ))}
    </div>
  );
}

const WorkThumbnail = ({ uid, thumbnail, svg, title, launchProject }) => (
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

WorkThumbnail.propTypes = {
  uid: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  svg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  launchProject: PropTypes.func.isRequired,
};

export default React.memo(Work);
