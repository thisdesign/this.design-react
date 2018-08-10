import React from 'react';
import './Homepage.css';

const Homepage = (props) => {
  console.log(props);
  const { image } = props.data.data;
  return (
    <div className="homepage">
      <div className="homepage__inner">
        <img src={image.url} alt={image.alt} />
      </div>
    </div>
  );
};

export default Homepage;
