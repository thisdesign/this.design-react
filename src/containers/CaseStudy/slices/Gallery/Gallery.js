import React, { useState, useEffect, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import Waypoint from 'react-waypoint';
import PropTypes from 'prop-types';

import { CsContext } from 'containers/CaseStudy/CaseStudy';
import Styled from './styled';

const useTimer = ({ slide, setNext, animating }) => {
  useEffect(
    () => {
      let interval;
      if (animating) {
        interval = setInterval(() => { setNext(); }, 2500);
      }
      return () => {
        if (interval) clearInterval(interval);
      };
    },
    [slide, animating],
  );
};

function Gallery({ animate, imageUrls, ratio }) {
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  const { dark } = useContext(CsContext);

  const prevIndex = slide ? slide - 1 : imageUrls.length - 1;
  const nextIndex = (slide + 1) % imageUrls.length;

  const setNext = () => setSlide(nextIndex);
  const setPrev = () => setSlide(prevIndex);

  const handleNav = (dir) => {
    if (dir === 'NEXT') setNext();
    else if (dir === 'PREV') setPrev();
    else setSlide(dir);
    setAnimating(false);
  };

  useTimer({ slide, setNext, animating });

  return (
    <Waypoint
      onEnter={() => setAnimating(true)}
      onLeave={() => setAnimating(false)}
    >
      <div>
        <ThemeProvider theme={{ dark }}>
          <Styled.Gallery className="grid -wrap">
            <Styled.ImageContainer ratio={ratio}>
              { imageUrls.map((url, i) => (
                <Styled.Image
                  src={url}
                  key={url}
                  current={slide === i}
                  previous={prevIndex === i}
                  animate={animate}
                />))}
              <Styled.OverlayNav >
                <Styled.Prev onClick={() => handleNav('PREV')} />
                <Styled.Next onClick={() => handleNav('NEXT')} />
              </Styled.OverlayNav>
            </Styled.ImageContainer>
            <Styled.Indicators>
              <Styled.Indicators.Inner>
                {imageUrls.map((url, i) => (
                  <Styled.Indicator key={url} onClick={() => handleNav(i)} />
              ))}
                <Styled.Indicator.Current index={slide} />
              </Styled.Indicators.Inner>
            </Styled.Indicators>
          </Styled.Gallery>
        </ThemeProvider>
      </div>
    </Waypoint>
  );
}

Gallery.propTypes = {
  animate: PropTypes.bool.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  ratio: PropTypes.number.isRequired,
};

export default React.memo(Gallery);
