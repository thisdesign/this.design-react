import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import { VideoCtx } from 'react-video-controls'
import Styled from './Styled'
import MuteIcon from './icons/Mute'
// import ReactPlayer from 'react-player'
// import MuteControl from './MuteControl/MuteControl'
// import VideoControls from './VideoControls/VideoControls'

export const VideoContext = React.createContext()

const VideoNode = memo(({ url, poster, controls, muteToggle, playing }) => {
  return (
    <Styled.VideoProvider src={url} muted poster={poster}>
      <Player
        shouldPlay={playing}
        muteToggle={muteToggle}
        controlsEnabled={controls}
      />
    </Styled.VideoProvider>
  )
})

function useAutoPlay(shouldPlay) {
  const { controls } = useContext(VideoCtx)

  if (shouldPlay) {
    controls.play()
  } else {
    controls.pause()
  }
}

function Player({ shouldPlay, muteToggle, controlsEnabled }) {
  const { video } = useContext(VideoCtx)
  useAutoPlay(shouldPlay)

  return (
    <Styled.Wrapper>
      {muteToggle && !controlsEnabled && <MuteToggle />}
      {controlsEnabled && <Controls />}
      {video}
    </Styled.Wrapper>
  )
}

function MuteToggle() {
  const { state, controls } = useContext(VideoCtx)

  function handleClick() {
    if (state.muted) controls.unmute()
    else controls.mute()
  }

  return (
    <Styled.ControlWrapper>
      <Styled.Mute muted={state.muted} onClick={handleClick} />
    </Styled.ControlWrapper>
  )
}

function Controls() {
  return 'CONTROLS'
}

VideoNode.propTypes = {
  url: PropTypes.string.isRequired,
  poster: PropTypes.string,
  controls: PropTypes.bool,
  muteToggle: PropTypes.bool,
  playing: PropTypes.bool,
}
export default VideoNode
