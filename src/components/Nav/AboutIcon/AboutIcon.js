import React from 'react';
import './AboutIcon.css';

const AboutIcon = (props) => {
  const { view } = props;
  return (
    <div className={`icon icon--about ${view === '/about' ? '-enabled' : ''}`}>
      <span className="icon__item icon--about__item" />
      <span className="icon__item icon--about__item" />
    </div>
  );
};

export default AboutIcon;
