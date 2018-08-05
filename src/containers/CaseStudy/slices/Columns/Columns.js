import React from 'react';
import { RichText } from 'prismic-reactjs';
import './columns.css';

const Columns = (props) => {
  const data = props.data.value[0];
  const text = RichText.render(data.text);
  const imageIsRight = data.right != null;

  const columnItems = [
    <div className="caseStudy__colBlock__col caseStudy__colBlock__col--media">
      <img src={data.image.url} alt={data.image.alt} />
    </div>,
    <div className="caseStudy__colBlock__col caseStudy__colBlock__col--text">
      {text}
    </div>,
  ];

  return (
    <div
      className={`caseStudy__colBlock grid ${!data.right
          ? ''
          : 'caseStudy__colBlock--right'
        }`}
    >
      {imageIsRight ? columnItems.reverse() : columnItems}
    </div>
  );
};

export default Columns;
