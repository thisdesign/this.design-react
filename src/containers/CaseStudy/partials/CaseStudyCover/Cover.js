import React from 'react';
// import CaseStudySplash from './CaseStudySplash/CaseStudySplash';
import Styled from './styled';
import { CsContext } from '../../CaseStudy';


const Cover = () => (
  <CsContext.Consumer>
    {({ header, next, isAnimating }) => (
      <Styled.Cover>
        <Styled.Fill backgroundColor={header.backgroundColor} />
        <Styled.Header>
          <Styled.Title next={next} itemTitle isAnimating={isAnimating}>
            {header.title}
          </Styled.Title>
          <Styled.Desc next={next}>
            {header.description}
          </Styled.Desc>
          <Styled.Services next={next}>
            {header.services}
          </Styled.Services>
        </Styled.Header>
        {/* <CaseStudySplash data={header} /> */}
        <CsContext.Consumer>{(val) => { console.log(val); }}</CsContext.Consumer>
        <Splash />
      </Styled.Cover>
  )}
  </CsContext.Consumer>
);

const Splash = () => (
  <CsContext.Consumer>
    {({ header }) => {
      const { videoUrl, imageUrl } = header.background;
      return (
        <Styled.Splash image={!videoUrl && imageUrl} />
    );
  }}
  </CsContext.Consumer>

);

export default React.memo(Cover);
