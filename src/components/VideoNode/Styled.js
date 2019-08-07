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
  overflow: hidden;
  user-select: none;
`

const DUR = 300
const ease = props => props.theme.ease.standard

const ControlWrapper = styled.div`
  color: ${props => props.theme.color.white};
  letter-spacing: 0.05em;
  position: absolute;
  z-index: 100;
  width: 100%;
  bottom: 0;
  right: 0;

  opacity: ${props => (props.active ? 1 : 0)};
  transform: translateY(${props => (props.active ? 0 : '1em')});
  transition: ${DUR}ms transform ${ease}, ${DUR}ms opacity ${ease};
`

const ControlsLayout = styled.div`
  display: flex;
  padding: 1em;
  align-items: center;

  > * {
    &:nth-child(1) {
      flex: 1;
    }
  }
`

const ControlItem = styled.div`
  margin: 0 0.5em;
  display: flex;
  align-items: center;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`

const Mute = styled(MuteIcon)`
  width: 1.34rem;
`

const Time = styled.div`
  display: flex;
  justify-content: space-between;

  position: relative;
  width: 6.5em;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    height: 1em;
    transform: translate3d(-50%, -50%, 0);
    border-right: 1px solid white;
  }
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
  ControlsLayout,
  SeekBar,
  Progress,
  Time,
  ControlItem,
}
