import React from 'react';

const Image = (props) => {
  const src = props.data.value[0].file.url;
  return (
    <img src={src} width="100%" />
  );
};

export default Image;
