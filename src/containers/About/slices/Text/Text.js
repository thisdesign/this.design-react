import React from 'react';
import { RichText } from 'prismic-reactjs';
import './Text.css';


const Text = (props) => {
  const { text } = props.data.primary;
  const { layout } = props.data.primary;
  return (
    <div className={`about__text -grid ${layout ? `-${layout}` : ''}`}>
      {RichText.render(text)}
    </div>
  );
};

export default Text;
