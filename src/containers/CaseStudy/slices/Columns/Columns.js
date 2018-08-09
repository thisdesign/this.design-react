import React from 'react';
import { RichText } from 'prismic-reactjs';
import './Columns.css';

const Columns = (props) => {
  const data = props.data.value[0];
  const text = RichText.render(data.text);
  const imageIsRight = data.right != null;
  const imageIsLarge = data.layout === '-column--2of3';
  const classes = [
    'caseStudy__colBlock',
    'grid',
    imageIsRight ? 'caseStudy__colBlock--right' : null,
    imageIsLarge ? 'caseStudy__colBlock--largeImage' : null,
  ].join(' ');

  const columnItems = [
    <div className="caseStudy__colBlock__col caseStudy__colBlock__col--media grid__inner" key="col-media">
      { data.video.url
          ? (
            <video autoPlay muted loop className="caseStudy__colBlock__col__video">
              <source src={data.video.url} />
            </video>
          )
          : <img src={data.image.url} alt={data.image.alt} />}
    </div>,
    <div className="caseStudy__colBlock__col caseStudy__colBlock__col--text grid__inner" key="col-img">
      {text}
    </div>,
  ];

  return (
    <div className={classes}>
      {imageIsRight ? columnItems.reverse() : columnItems}
    </div>
  );
};

export default Columns;
