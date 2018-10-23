import React from 'react';

const GridIcon = (props) => {
  const { view } = props;
  return (
    <div className={`icon icon--grid ${view === 'work' ? '-enabled' : ''}`}>
      <span className="icon__item icon--grid__item" />
      <span className="icon__item icon--grid__item" />
      <span className="icon__item icon--grid__item" />
      <span className="icon__item icon--grid__item" />
    </div>
  );
};

export default GridIcon;
