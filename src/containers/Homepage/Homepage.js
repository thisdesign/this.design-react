import React, { useState, useRef, useEffect } from 'react';
import Loading from 'components/Loading/Loading';
import PropTypes from 'prop-types';
import HomepageWrapper from './HomepageWrapper';
import Styled from './styled';
import Posed from './posed';

function Homepage({ openingFromHome, randomUrl }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const ref = useRef();

  useEffect(() => {
    ref.current.onloadeddata = () => setVideoLoaded(true);
  }, []);

  return (
    <Posed.Homepage pose={openingFromHome ? 'animating' : 'normal'}>
      {!videoLoaded && <Loading />}
      <Styled.Inner>
        <Styled.Video autoPlay loop muted playsInline ref={ref}>
          <source src={randomUrl} type="video/mp4" />
        </Styled.Video>
      </Styled.Inner>
    </Posed.Homepage>
  );
}

Homepage.propTypes = {
  openingFromHome: PropTypes.bool.isRequired,
  randomUrl: PropTypes.string.isRequired,
};

export { Homepage };
export default HomepageWrapper;
