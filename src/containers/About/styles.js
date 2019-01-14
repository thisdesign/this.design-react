import styled from 'styled-components';
import React from 'react';

export const SectionTitle = styled.h3`
  padding-bottom: 60px;
  text-align: center;
`;

export const Wrapper = styled.div`
  margin: 0px auto;
  /*border: 1px solid orange;*/
  padding: 2rem;

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
  /*border: 1px solid red; */
  padding: 10vh 0;
  box-sizing: border-box;
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
  /*border: 1px solid green; */
`;

export const Column = styled.div`
  width: ${({ items }) => {
    switch (items) {
      case 2: return '50%';
      case 3: return '33.3%';
      case 4: return '25%';
      default: return '33.3%';
    }
  }}
  padding: 0 2rem;
  box-sizing: border-box;
  /*border: 1px solid blue;*/

  img {
    width: 100%;
  }
`;

export default null;
