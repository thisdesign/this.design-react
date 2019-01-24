import styled from 'styled-components';
import React from 'react';

export const SectionTitle = styled.h3`
  padding-bottom: 60px;
  text-align: center;
`;

const BORDERS = false;

export const Wrapper = styled.div`
  margin: 0px auto;
  padding: 2rem;
  border: ${BORDERS ? '1px solid orange' : 'none'};

  @media (min-width: 768px){
    max-width: 1500px;
    width: ${({ large }) => (large ? '90%' : '80%')};
  }
`;

const FullHeight = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10vh 0;
  box-sizing: border-box;

  border: ${BORDERS ? '1px solid red' : 'none'};
`;

export const FullHeightWrapper = ({ children, large }) => (
  <FullHeight>
    <Wrapper large={large}>{children}</Wrapper>
  </FullHeight>
);

export const ColumnWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -2rem;
  border: ${BORDERS ? '1px solid green' : 'none'};
`;

export const Column = styled.div`
  width: ${({ fullMobile }) => (fullMobile ? '100%' : '50%')}
  @media (min-width: 768px){
    width: ${({ items }) => {
    switch (items) {
      case 2: return '50%';
      case 3: return '33.3%';
      case 4: return '25%';
      default: return '33.3%';
    }
  }}
  }
  padding: 0 2rem;
  box-sizing: border-box;
  border: ${BORDERS ? '1px solid blue' : 'none'};

  img {
    width: 100%;
  }
`;

export const About = styled.div``;


export default null;
