import styled from 'styled-components';

const _indicatorWidth = 40;
const _indicatorMargin = 5;

export const Indicators = styled.div`
  display: flex;
`;

Indicators.Inner = styled.div`
  position: relative;
  display: inline-flex;
  margin: 25px auto 0;
`;

export const Indicator = styled.div`
  width: ${_indicatorWidth + (_indicatorMargin * 2)}px;
  height: 3px;
  display: inline-block;
  transition: 200ms transform cubic-bezier(.4, 0, .2, 1);
  cursor: pointer;
  margin: 0 auto;

  &::after {
    content: '';
    width: ${_indicatorWidth}px
    background: ${({ dark }) => (dark ? 'white' : 'black')}
    opacity: .10;
    height: 3px;
    margin: 0 auto;
    display: block;
  }
`;

Indicator.Current = styled(Indicator)`
  z-index: 100;
  left: 0;
  top: 0;
  position: absolute;
  transform:  translate3d(${({ index }) => index * 100}%, 0, 0);

  &::after {
    content: '';
    opacity: .6;
  }
`;


export default null;
