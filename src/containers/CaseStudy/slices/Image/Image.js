import React from 'react';

const Image = (props) => {
  const src = props.data.value[0].file.url;
  return (
    <div className="casestudy__image">
      <img src={src} width="100%" />
    </div>
  );
};

export default Image;
