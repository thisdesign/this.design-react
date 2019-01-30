import styled from 'styled-components/macro';
import getTheme from 'util/getTheme';

const Styled = {};

const _wrap = getTheme('_wrap');
const _grid = getTheme('_grid');
const _padding = getTheme('_padding');

// -grid -wrap casestudy__diptych
Styled.Diptych = styled.div`
  ${_wrap};
  ${_grid};
`;


// casestudy__diptych__item -padding
Styled.DiptychItem = styled.div`
  ${_padding}
  flex-basis: 50%;
`;

Styled.Img = styled.img`
  width: 100%;
`;

// casestudy__diptych__spacer
Styled.Spacer = styled.div`

`;

export default Styled;
