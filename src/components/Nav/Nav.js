import React from 'react';
import { Link } from 'react-router-dom';
import GridIcon from './GridIcon/GridIcon';
import AboutIcon from './AboutIcon/AboutIcon';

import './Nav.css';

const Nav = (props) => {
  const { view } = props;
  return (
    <nav className="nav -wrap-nav">
      <div className="nav__inner">
        <div className="nav__item">
          <Link to="/work/">
            {view !== 'about' && <GridIcon view={view} />}
          </Link>
        </div>
        <div className="nav__item">
          <Link to="/about/">
            {view !== 'work' && <AboutIcon view={view} />}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
