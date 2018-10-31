import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CursorAnchor from 'components/CursorDot/CursorAnchor';
import GridIcon from './GridIcon/GridIcon';
import AboutIcon from './AboutIcon/AboutIcon';
import './Nav.css';

const Nav = (props) => {
  const {
    view, currentCaseStudy, changeView,
  } = props;

  const handleNavButton = (futureView) => {
    const asideShouldOpen = (view !== futureView);
    if (asideShouldOpen) {
      changeView(futureView);
    } else {
      changeView('root');
    }
  };

  const linkTo = (link) => {
    if (view === 'root') {
      return `/${link}`;
    } else if (currentCaseStudy) {
      return `/work/${currentCaseStudy}`;
    }
    return '/';
  };

  const navLinks = ['work', 'about'];
  const navState = [
    props.scrolledPastCsCover && view === 'root'
      ? 'nav--dark'
      : '',
    `-view-is-${view}`,
  ].join(' ');

  return (
    <nav className={`nav -wrap-nav ${navState}`}>
      <div className="nav__inner">
        {navLinks.map(link => (
          <div className="nav__item" key={link} >
            <CursorAnchor textId={view === 'root' ? link : 'close'}>
              <Link
                to={(() => linkTo(link))()}
                onClick={() => handleNavButton(link)}
              >
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

Nav.defaultProps = {
  currentCaseStudy: null,
};

Nav.propTypes = {
  view: PropTypes.string.isRequired,
  currentCaseStudy: PropTypes.string,
  changeView: PropTypes.func.isRequired,
};

export default Nav;
