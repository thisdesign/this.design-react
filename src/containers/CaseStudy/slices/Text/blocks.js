import styled, { css } from 'styled-components';
import getTheme from 'util/getTheme';

const _wrap = getTheme('_wrap');
const Styled = {};

Styled.Text = styled.div`
  ${_wrap}
  max-width: 30em!important;
  margin: 0px auto;
`;

export default Styled;
