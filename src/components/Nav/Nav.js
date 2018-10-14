import React from 'react';
import GridIcon from './GridIcon/GridIcon';
import AboutIcon from './AboutIcon/AboutIcon';

import './Nav.css';

const Nav = (props) => {
  const { view, changeView } = props;
  return (
    <nav className="nav -wrap-nav">
      <div className="nav__inner">
        <div className="nav__item">
          <a onClick={() => changeView('work')}>
            {view !== 'about' && <GridIcon view={view} />}
          </a>
        </div>
        <div className="nav__item">
          <a onClick={() => changeView('about')}>
            {view !== 'work' && <AboutIcon view={view} />}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
