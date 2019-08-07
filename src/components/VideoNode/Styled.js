import styled from 'styled-components/macro'
import VideoProviderNode from 'react-video-controls'
import MuteIcon from './icons/Mute'

const VideoProvider = styled(VideoProviderNode)`
  &[poster] {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Wrapper = styled.div`
  position: relative;
`

const ControlWrapper = styled.div`
  position: absolute;
  z-index: 50;
  width: 100%;
  bottom: 0;
  right: 0;
`

const Mute = styled(MuteIcon)`
  width: 1.25rem;
`

export default { VideoProvider, Mute, Wrapper, ControlWrapper }
