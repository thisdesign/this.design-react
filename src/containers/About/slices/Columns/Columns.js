import React from 'react';
import uuidv1 from 'uuid/v1';
import { RichText } from 'prismic-reactjs';
import './Columns.css';


const Columns = (props) => {
  const { items } = props.data;
  const { layout, classnames } = props.data.primary;

  return (
    <div className={`about__columns -grid -wrap--lg -left -top ${classnames || ''} ${layout ? `-${layout}` : ''}`}>
      {items.map(item => (
        <div className="about__columns__col" key={uuidv1()}>
          {RichText.render(item.text)}
        </div>
      ))}
    </div>
  );
};

export default Columns;
