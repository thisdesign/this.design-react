import React from 'react';
import { RichText } from 'prismic-reactjs';
import './columns.css';

const Columns = (props) => {
  const data = props.data.value[0];
  const text = RichText.asText(data.text);

  return (
    <div className={`caseStudy__column ${!data.right ? '' : 'caseStudy__column--right'}`}>
      <img src={data.image.url} alt={data.image.alt} />
      <p>{text}</p>
    </div>
  );
};

export default Columns;
