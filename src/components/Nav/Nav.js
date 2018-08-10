import React from 'react';
import GridIcon from './GridIcon/GridIcon';

import './Nav.css';

const Nav = (props) => {
  const { handleViewChange, asideIsOpen } = props;
  return (
    <nav className="nav -wrap-nav">
      <div className="nav__inner">
        <div className="nav__item">
          <a onClick={() => { handleViewChange('work'); }}>
            <GridIcon asideIsOpen={() => asideIsOpen()} />
          </a>
        </div>
        <div className="nav__item">
          <a onClick={() => { handleViewChange('about'); }}>
            {!asideIsOpen() ? 'ABOUT' : null}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
