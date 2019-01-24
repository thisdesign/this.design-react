import styled, { css } from 'styled-components';
import { Column } from 'containers/About/styles';

const small = css`
  font-size: .9em;
`;

export const Project = styled(Column)`
  margin-bottom: 1rem;
  line-height: 1.75;
`;

export const YearWrapper = styled.div`
  margin: 4rem 0;
`;

Project.Roles = styled.div`
  ${small}
  font-style: italic;
`;

Project.Desc = styled.div`
  ${small}
`;

Project.Title = styled.h4`
  a,
  p {
    color: white!important;
  }

  a{
    text-decoration: underline;
  }
`;

export default null;
