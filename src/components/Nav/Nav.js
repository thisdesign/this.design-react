import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import GridIcon from './GridIcon/GridIcon';
import AboutIcon from './AboutIcon/AboutIcon';

import './Nav.css';

/**
 * TODO: route to /work and /about with transitions
 *
 * @param {*} props
 * @returns
 */
const Nav = ({
  // handleViewChange,
  // we've largely replaced view with location.pathname
  // view,
  location: { pathname },
}) => (
  // const { handleViewChange, view } = props;
  <nav className="nav -wrap-nav">
    <div className="nav__inner">
      <div className="nav__item">
        <Link to={pathname === '/work' ? '/' : '/work'}>
          {pathname !== '/about' && <GridIcon view={pathname} />}
        </Link>
      </div>
      <div className="nav__item">
        <Link
          // onClick={() => {
          //   handleViewChange('about');
          // }}
          to={pathname === '/about' ? '/' : '/about'}
        >
          {pathname !== '/work' && <AboutIcon view={pathname} />}
        </Link>
      </div>
    </div>
  </nav>
);
export default withRouter(Nav);
