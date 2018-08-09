import React from 'react';
import './Pullquote.css';

const Pullquote = (props) => {
  const { quote, source } = props.data.value[0];

  return (
    <div className="casestudy__pullquote grid" >
      <div className="grid__inner">
        <h1>{quote}</h1>
        <cite><h3>{source}</h3></cite>
      </div>
    </div>
  );
};

export default Pullquote;
