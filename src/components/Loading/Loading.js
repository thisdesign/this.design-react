import React from 'react';
import styled, { keyframes } from 'styled-components';

export default function Loading() {
  return (
    <Loader>
      <div>
        <span />
        <span />
        <span />
      </div>
    </Loader>
  );
}

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100vw;
  height: 100vh;

  div {
    position: relative;
    width: 4em;

    span {
      width:100%;
      height: 0px;
      border-bottom: 1.75px solid #f6f6f6;
      display:block;
      position: absolute;
      top: 0;

      &:nth-child(1){
        animation: ${rotate360} 0.75s linear infinite;
      }
      &:nth-child(2){
        animation: ${rotate360} 1.5s linear infinite;
      }
      &:nth-child(3){
        animation: ${rotate360} 3s linear infinite;
      }
    }
  }
`;

// const Indicator = styled.h3`
//   font-weight: bold;
//   animation: ${rotate360} 0.75s linear infinite;
// `;
