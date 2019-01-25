import React, { useState, useEffect } from 'react';
import Waypoint from 'react-waypoint';
import PropTypes from 'prop-types';
import Styled from './styled';

const useTimer = (slide, setNext) => {
  useEffect(
    () => {
      const interval = setInterval(() => {
        setNext();
      }, 2000);
      return () => { clearInterval(interval); };
    },
    [slide],
  );
};

function Gallery({ animate, imageUrls, ratio }) {
  const [slide, setSlide] = useState(0);
  const prevIndex = slide ? slide - 1 : imageUrls.length - 1;
  const nextIndex = (slide + 1) % imageUrls.length;

  const setNext = () => setSlide(nextIndex);
  const setPrev = () => setSlide(prevIndex);

  useTimer(slide, setNext);

  return (
    <Waypoint >
      <div>
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
              <Styled.Prev onClick={setPrev} />
              <Styled.Next onClick={setNext} />
            </Styled.OverlayNav>
          </Styled.ImageContainer>
          <Styled.Indicators>
            <Styled.Indicators.Inner>
              {imageUrls.map((url, i) => (
                <Styled.Indicator key={url} onClick={() => setSlide(i)} />
              ))}
              <Styled.Indicator.Current index={slide} />
            </Styled.Indicators.Inner>
          </Styled.Indicators>
        </Styled.Gallery>
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
