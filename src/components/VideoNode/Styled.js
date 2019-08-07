import styled from 'styled-components/macro'
import * as Controls from 'react-video-controls'
import MuteIcon from './icons/Mute'

const VideoProvider = styled(Controls.default)`
  &[poster] {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Wrapper = styled.div`
  position: relative;
`

const DUR = 300
const ease = props => props.theme.ease.standard

const ControlWrapper = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  bottom: 0;
  right: 0;

  opacity: ${props => (props.active ? 1 : 0)};
  transform: translateY(${props => (props.active ? 0 : '1em')});
  transition: ${DUR}ms transform ${ease}, ${DUR}ms opacity ${ease};
`

const Mute = styled(MuteIcon)`
  width: 1.5rem;
`

const SeekBar = styled(Controls.SeekBar)``

const Progress = styled(Controls.SeekBar.Progress)`
  background: orange !important;
  height: 5px !important;
`

export default {
  VideoProvider,
  Mute,
  Wrapper,
  ControlWrapper,
  SeekBar,
  Progress,
}
