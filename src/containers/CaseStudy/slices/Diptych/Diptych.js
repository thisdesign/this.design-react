import React from 'react';
import './Diptych.css';

const Diptych = (props) => {
  const {
    image1,
    image2,
    offset1,
    offset2,
  } = props.data.value[0];
  return (
    <div className="-grid -wrap casestudy__diptych">
      <div className="casestudy__diptych__item -padding">
        <img
          src={image1.url}
          alt={props.title}
          style={{ transform: `translateX(${offset1}%)` }}
        />
      </div>
      <div className="casestudy__diptych__item -padding">
        <img
          className="casestudy__diptych__item"
          src={image2.url}
          alt={props.title}
          style={{ transform: `translateX(${offset2}%)` }}
        />
      </div>
    </div>
  );
};

export default Diptych;
