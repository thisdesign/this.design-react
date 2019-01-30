import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import CaseStudySplash from './CaseStudySplash/CaseStudySplash';
import isMobile from 'util/isMobile';
import Styled from './styled';
import { CsContext } from '../../CaseStudy';


const mobile = isMobile();
console.log(mobile);
const Cover = () => {
  const {
    header, next, isAnimating, isHome,
  } = useContext(CsContext);
  return (
    <Styled.Cover>
      <Styled.Fill backgroundColor={header.backgroundColor} />
      <Styled.Header>
        <Styled.Title next={next} itemTitle isAnimating={isAnimating}>
          {header.title}
        </Styled.Title>
        <Styled.Desc next={next} isHome={isHome}>
          {header.description}
        </Styled.Desc>
        <Styled.Services next={next} isHome={isHome}>
          {header.services}
        </Styled.Services>
      </Styled.Header>
      <Splash />
    </Styled.Cover>
  );
};

const Splash = () => {
  const { header } = useContext(CsContext);
  const { videoUrl, imageUrl, mobileImage } = header.background;
  if (!mobile) {
    return (
      <Styled.Splash image={!videoUrl && imageUrl} >
        <Video src={videoUrl} bg name="BG Video" />
        <AuxiliaryItem />
      </Styled.Splash>
    );
  }
  return <Styled.Splash image={mobileImage} />;
};

const AuxiliaryItem = () => (
  <CsContext.Consumer>
    {({ header, alt }) => {
      const {
       width, videoUrl, position, imageUrl,
      } = header.auxItem;
      return (
        <Styled.AuxWrapper width={width} position={position} data-name="Aux Item Container">
          {imageUrl && <Styled.AuxImg src={imageUrl} alt={alt} />}
          <Video src={videoUrl} name="Aux Video" />
        </Styled.AuxWrapper>
    );
}}
  </CsContext.Consumer>
);

const Video = ({ src, name }) => (
  src ?
    <Styled.Video autoPlay muted loop playsinline data-name={name}>
      <source src={src} />
    </Styled.Video>
    : null
);

Video.defaultProps = {
  src: null,
};

Video.propTypes = {
  src: PropTypes.string,
};

export default React.memo(Cover);
