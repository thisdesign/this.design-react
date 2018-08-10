import React from 'react';
import './GridIcon.css';

const GridIcon = (props) => {
  const { asideIsOpen } = props;
  return (
    <div className={`icon icon--grid ${asideIsOpen() ? '-enabled' : ''}`}>
      <span className="icon--grid__item" />
      <span className="icon--grid__item" />
      <span className="icon--grid__item" />
      <span className="icon--grid__item" />
    </div>
  );
};

export default GridIcon;
