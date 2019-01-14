import React from 'react';
import styled from 'styled-components';
import { Wrapper, SectionTitle, ColumnWrapper, Column } from 'containers/About/styles';

const Clients = ({ imageUrls, title }) => (
  <Wrapper bottomPadding>
    <SectionTitle>{title}</SectionTitle>
    <ColumnWrapper>
      <Logos imageUrls={imageUrls} />
    </ColumnWrapper>
  </Wrapper>
);

const Logos = ({ imageUrls }) => (
  imageUrls.map(img => (
    <Column key={img}>
      <Image src={img} alt="This Design | Portland, OR" />
    </Column>
  ))
);

const Image = styled.img`
  margin: 0px auto;
  width: 50%;
`;

export default Clients;
