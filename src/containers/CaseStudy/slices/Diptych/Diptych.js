import React from 'react';

const Diptych = (props) => {
  const {
    image1,
    image2,
    offset1,
    offset2,
  } = props.data.value[0];
  return (
    <React.Fragment>
      <img
        src={image1.url}
        alt={image1.alt}
        width="50%"
        style={{ transform: `translateX(${offset1}%)` }}
      />
      <img
        src={image2.url}
        alt={image2.alt}
        width="50%"
        style={{ transform: `translateX(${offset2}%)` }}
      />
    </React.Fragment>
  );
};

export default Diptych;
