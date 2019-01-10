import React from 'react';
import './clients.scss';

const Clients = ({ imageUrls, title }) => (
  <div className="about__block -wrap--lg -wrap">
    <h3 className="about__h3">{title}</h3>
    <div className="about__clients__grid">
      <Logos imageUrls={imageUrls} />
    </div>
  </div>
);

const Logos = ({ imageUrls }) => (
  imageUrls.map(img => (
    <div className="about__clients__grid--item" key={img}>
      <img src={img} alt="This Design | Portland, OR" />
    </div>
  ))
);

export default Clients;
