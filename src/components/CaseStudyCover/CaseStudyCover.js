import React from 'react';
import { RichText } from 'prismic-reactjs';
import './CaseStudyCover.css';

const CaseStudyCover = (props) => {
  const { data } = props;
  const { color } = props.data;
  const header = props.data.header[0];

  console.log(header);

  return (
    <div className="casestudy__cover" >
      <div className="casestudy__fill" style={{ background: color }}>
        <div className="casestudy__header">
          {RichText.render(header.title)}
          {RichText.render(header.copy)}
        </div>
        <div className="casestudy__splash">
          <div className="casestudy__splash__bg -cover" style={{ backgroundImage: `url(${header.image1.url})` }} />
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCover;
