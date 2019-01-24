import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LayoutContext from 'containers/Layout/LayoutContext';
import CursorAnchor from 'components/CursorDot/CursorAnchor';
import GridIcon from './GridIcon/GridIcon';
import AboutIcon from './AboutIcon/AboutIcon';
import './Nav.scss';

const Nav = ({
  view, navInverted, currentUid,
}) => {
  const linkTo = (link) => {
    if (view === 'root') {
      return `/${link}`;
    } else if (currentUid) {
      return `/work/${currentUid}`;
    }
    return '/';
  };

  const navState = [
    navInverted && view === 'root'
      ? 'nav--dark'
      : '',
    `-view-is-${view}`,
  ].join(' ');

  return (
    <nav className={`nav -wrap-nav ${navState}`}>
      <div className="nav__inner">
        {['work', 'about'].map(link => (
          <div className="nav__item" key={link} >
            <CursorAnchor textId={view === 'root' ? link : 'close'}>
              <Link to={(() => linkTo(link))()} >
                {link === 'work' && <GridIcon view={view} />}
                {link === 'about' && <AboutIcon view={view} />}
              </Link>
            </CursorAnchor>
          </div>
          ))}
      </div>
    </nav>
  );
};

Nav.propTypes = {
  view: PropTypes.oneOf(['root', 'work', 'about']).isRequired,
  currentUid: PropTypes.string,
  navInverted: PropTypes.bool,
};

Nav.defaultProps = {
  currentUid: null,
  navInverted: false,
};

export default React.forwardRef((props, ref) => (
  <LayoutContext.Consumer>
    {({ view, csData, navInverted }) =>
      (<Nav
        {
        ...props}
        currentUid={csData.currentUid}
        {...{ view, csData, navInverted }}
        ref={ref}
      />)}
  </LayoutContext.Consumer>
));
