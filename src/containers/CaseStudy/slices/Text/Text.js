import React from 'react';
import { RichText } from 'prismic-reactjs';

const Text = (props) => {
  const text = RichText.asText(props.data.value);
  return (
    <p>{text}</p>
  );
};

export default Text;
