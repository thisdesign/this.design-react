import React from 'react';
import { RichText } from 'prismic-reactjs';
import './columns.css';

const Columns = (props) => {
  const data = props.data.value[0];
  const text = RichText.asText(data.text);

  const colContent = data.right
    ? (
      <React.Fragment>
        <p>{text}</p>
        <img src={data.image.url} alt={data.image.alt} />
      </React.Fragment>
    )
    : (
      <React.Fragment>
        <img src={data.image.url} alt={data.image.alt} />
        <p>{text}</p>
      </React.Fragment>
    );
  return (
    <div className="caseStudy__column">
      {colContent}
    </div>
  );
};

export default Columns;
