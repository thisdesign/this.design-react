import React from 'react';
import './Nav.css';

const Nav = (props) => {
  const { handleViewChange, asideIsOpen } = props;
  return (
    <nav className="nav">
      <div className="nav__inner">
        <div className="nav__item">
          <a href="#" onClick={() => { handleViewChange('work'); }}>
            {!asideIsOpen() ? 'WORK' : 'CLOSE' }
          </a>
        </div>
        <div className="nav__item">
          <a href="#" onClick={() => { handleViewChange('about'); }}>
            {!asideIsOpen() ? 'ABOUT' : null}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
