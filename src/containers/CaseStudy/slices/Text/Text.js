import React from 'react';
import './Text.scss';

const Text = ({ value }) => (
  <div className="casestudy__text -wrap">{value}</div>
);

export default React.memo(Text);
