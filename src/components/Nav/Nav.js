import React from 'react';
import { Link } from 'react-router-dom';
import GridIcon from './GridIcon/GridIcon';
import AboutIcon from './AboutIcon/AboutIcon';

import './Nav.css';

const Nav = (props) => {
  const {
    view: currentView, currentCaseStudy, changeView,
  } = props;

  const handleNavButton = (futureView) => {
    const asideShouldOpen = (currentView !== futureView);
    if (asideShouldOpen) {
      changeView(futureView);
    } else {
      changeView('root');
    }
  };

  const viewToggleLink = (view) => {
    if (currentView === 'root') {
      return `/${view}`;
    } else if (currentCaseStudy) {
      return `/work/${currentCaseStudy}`;
    }
    return '/';
  };

  const navLinks = ['work', 'about'];

  return (
    <nav className="nav -wrap-nav">
      <div className="nav__inner">

        {navLinks.map(link => (
          <div className="nav__item" key={link} >

            <Link
              to={(() => viewToggleLink(link))()}
              onClick={() => handleNavButton(link)}
            >
              {link === 'work' && <GridIcon view={currentView} />}
              {link === 'about' && <AboutIcon view={currentView} />}
            </Link>
          </div>
          ))}
      </div>
    </nav>
  );
};

export default Nav;
