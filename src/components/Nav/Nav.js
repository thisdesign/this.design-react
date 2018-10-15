import React from 'react';
import { Link } from 'react-router-dom';
import GridIcon from './GridIcon/GridIcon';
import AboutIcon from './AboutIcon/AboutIcon';

import './Nav.css';

const Nav = (props) => {
  const { view, closeAside, openAside } = props;

  const handleNavButton = (futureView) => {
    const asideShouldOpen = (view !== futureView);
    if (asideShouldOpen) {
      openAside(futureView);
    } else {
      closeAside('root');
    }
  };

  return (
    <nav className="nav -wrap-nav">
      <div className="nav__inner">
        <div className="nav__item">
          <Link to="/work" onClick={() => handleNavButton('work')}>
            {view !== 'about' && <GridIcon view={view} />}
          </Link>
        </div>
        <div className="nav__item">
          <a onClick={() => handleNavButton('about')}>
            {view !== 'work' && <AboutIcon view={view} />}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
