import React from 'react';
import { Link } from 'react-router-dom';
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

  const linkTo = (currentView) => {
    if (currentView === 'root') {
      return `/${currentView}`;
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
            <Link
              to={(() => linkTo(link))()}
              onClick={() => handleNavButton(link)}
            >
              {link === 'work' && <GridIcon view={view} />}
              {link === 'about' && <AboutIcon view={view} />}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
