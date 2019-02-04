import React, { useState, useRef, useEffect } from 'react';
import Loading from 'components/Loading/Loading';
import PropTypes from 'prop-types';
import Styled from './styled';
import HomepageWrapper from './HomepageWrapper';

function Homepage({ openingFromHome, randomUrl }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const ref = useRef();

  useEffect(() => {
    ref.current.onloadeddata = () => setVideoLoaded(true);
  }, []);

  return (
    <Styled.Homepage animating={openingFromHome}>
      {!videoLoaded && <Loading />}
      <Styled.Inner>
        <Styled.Video autoPlay loop muted playsInline ref={ref}>
          <source src={randomUrl} type="video/mp4" />
        </Styled.Video>
      </Styled.Inner>
    </Styled.Homepage>
  );
}

Homepage.propTypes = {
  openingFromHome: PropTypes.bool.isRequired,
  randomUrl: PropTypes.string.isRequired,
};

export { Homepage };
export default HomepageWrapper;
