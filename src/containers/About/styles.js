import styled from 'styled-components';

export const SectionTitle = styled.h3`
  padding-bottom: 60px;
  text-align: center;
`;

export const Wrapper = styled.div`
  margin: 0px auto;

  @media (min-width: 768px){
    max-width: 1500px;
    width: ${({ large }) => (large ? '90%' : '80%')};
  }
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -2rem;
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
`;

export default null;
