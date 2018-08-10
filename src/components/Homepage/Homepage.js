import React from 'react';
import './Homepage.css';
import isMobile from '../../util/isMobile';

const Homepage = (props) => {
  const { data } = props.data;
  const { image } = data;
  const videoURLs = data.video_group.map(vid => vid.link.url);

  return (
    <div className="homepage">
      <div className="homepage__inner">

        {!isMobile()
          ? (
            <video autoPlay loop muted className="homepage__inner__video">
              <source src={videoURLs[0]} type="video/mp4" />
            </video>
          ) : <img className="homepage__inner__image" src={image.url} alt={image.alt} />
        }
      </div>
    </div>
  );
};

export default Homepage;
