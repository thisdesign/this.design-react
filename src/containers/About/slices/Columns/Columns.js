import React from 'react';
import { RichText } from 'prismic-reactjs';
import './Columns.css';

const Columns = (props) => {
  const { items } = props.data;
  const { layout } = props.data.primary;

  return (
    <div className={`about__columns grid -left -top ${layout ? `-${layout}` : ''}`}>
      {items.map(item => (
        <div className="about__columns__col">
          {RichText.render(item.text)}
        </div>
      ))}
    </div>
  );
};

export default Columns;
