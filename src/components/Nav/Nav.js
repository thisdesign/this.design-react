import React from 'react';
import { Link } from 'react-router-dom';
import GridIcon from './GridIcon/GridIcon';
import AboutIcon from './AboutIcon/AboutIcon';

import './Nav.css';

/**
 * TODO: route to /work and /about with transitions
 *
 * @param {*} props
 * @returns
 */
const Nav = (props) => {
  const { handleViewChange, view } = props;
  return (
    <nav className="nav -wrap-nav">
      <div className="nav__inner">
        <div className="nav__item">
          <a
            onClick={() => {
              handleViewChange('work');
            }}
          >
            {view !== 'about' && <GridIcon view={view} />}
          </a>
        </div>
        <div className="nav__item">
          <Link
            // onClick={() => {
            //   handleViewChange('about');
            // }}
            to="/about"
          >
            {view !== 'work' && <AboutIcon view={view} />}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
