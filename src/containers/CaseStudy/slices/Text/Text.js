import { RichText } from 'prismic-reactjs';
import React from 'react';
import './Text.css';

const Text = props => (
  <div className="casestudy__text -wrap">{RichText.render(props.data.value)}</div>
);

export default React.memo(Text);
