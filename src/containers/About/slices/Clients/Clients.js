import React from 'react';
import styled from 'styled-components';
import { FullHeightWrapper, SectionTitle, ColumnWrapper, Column } from 'containers/About/styles';

const Clients = ({ imageUrls, title }) => (
  <FullHeightWrapper>
    <SectionTitle>{title}</SectionTitle>
    <ColumnWrapper>
      <Logos imageUrls={imageUrls} />
    </ColumnWrapper>
  </FullHeightWrapper>
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
  width: 50%!important;
`;

export default Clients;
