import React from 'react';
import styled from 'styled-components';

export default function NotFound() {
  return (
    <FullScreenCentered>
      <h1>404 - Not Found</h1>
    </FullScreenCentered>
  );
}

const FullScreenCentered = styled.div`
  width:  100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
