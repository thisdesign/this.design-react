import React from 'react';
import './Diptych.css';

const Diptych = (props) => {
  const dataSource = props.data.value
    ? props.data.value[0] // v1
    : props.data.primary; // v2

  const {
    image1,
    image2,
    offset1,
    offset2,
  } = dataSource;
  return (
    <div className="-grid -wrap casestudy__diptych">
      <div className="casestudy__diptych__item -padding">
        {image1.url &&
          <img
            src={image1.url}
            alt={props.title}
            style={{ transform: `translateX(${offset1}%)` }}
          />}
      </div>
      <div className="casestudy__diptych__item -padding">
        {image2.url &&
          <img
            className="casestudy__diptych__item"
            src={image2.url}
            alt={props.title}
            style={{ transform: `translateX(${offset2}%)` }}
          />}
      </div>
    </div>
  );
};

export default Diptych;
