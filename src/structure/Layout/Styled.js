import styled from 'styled-components/macro'
import views from './viewPos'

const View = styled.aside`
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  top: 0;
  left: 0;
  transition: ${props => props.theme.duration.standard}ms transform
    ${props => props.theme.ease.standard};
  will-change: transform;
`

View.Root = styled(View)`
  z-index: 10;
  transform: translate3d(${views.root}%, 0, 0);
`

View.Work = styled(View)`
  background: ${props => props.theme.colors.white};
  transform: translate3d(${views.work}%, 0, 0);
`

View.About = styled(View)`
  background: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.midGrey};
  transform: translate3d(${views.about}%, 0, 0);
`

const ViewInner = styled.div`
  opacity: 0;
  will-change: opacity;
  transition: ${props => props.theme.duration.standard}ms opacity
    ${props => props.theme.ease.standard};
`

ViewInner.Work = styled(ViewInner)`
  opacity: ${props => (props.theme.view === 'work' ? '1' : '0')};
`

ViewInner.About = styled(ViewInner)`
  opacity: ${props => (props.theme.view === 'about' ? '1' : '0')};
`

export default { View, ViewInner }
