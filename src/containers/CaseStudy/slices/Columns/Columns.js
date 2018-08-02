import React from 'react';
import { RichText } from 'prismic-reactjs';
import './columns.css';

const Columns = (props) => {
  const data = props.data.value[0];
  const text = RichText.render(data.text);

  return (
    <div className={`caseStudy__colBlock ${!data.right ? '' : 'caseStudy__colBlock--right'}`}>
      <div className="caseStudy__colBlock__col">
        <img src={data.image.url} alt={data.image.alt} />
      </div>
      <div className="caseStudy__colBlock__col">
        {text}
      </div>
    </div>
  );
};

export default Columns;
