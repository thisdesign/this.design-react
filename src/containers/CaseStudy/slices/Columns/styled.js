import styled, { css } from 'styled-components';
import Parallax from 'components/Parallax/Parallax';

const Styled = {};

const _col = css`
  flex-basis: 50%;
`;

const _padding = css`
  ${({ theme }) => theme._padding}
`;

const _wrap = css`
  ${({ theme }) => theme._wrap}
`;

Styled.Text = styled.div`
  ${_col} ${_padding}
  &>div{
    max-width: 25em;
    margin: 0 auto;
  }
`;

Styled.Media = styled(Parallax)`
  ${_col} ${_padding}
  max-width: 80em;
  margin: 90px auto;

  img,
  video {
    width: 100%;
  }
`;

Styled.Columns = styled.div`
  ${_wrap}
  display: flex;
  align-items: center;
`;
export default Styled;
