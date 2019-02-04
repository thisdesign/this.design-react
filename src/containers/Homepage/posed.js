import posed from 'react-pose';
import Styled from './styled';

const Posed = {};

Posed.Homepage = posed(Styled.Homepage)({
  animating: {
    y: 'calc(-100vh + 400px)',
    transition: { duration: 600 },
  },
  normal: { y: '0vh', transition: { duration: 0 } },
});

export default Posed;
