import React, {
  memo,
  useContext,
  useState,
  useEffect,
  createContext,
} from 'react'
import PropTypes from 'prop-types'
import { VideoCtx } from 'react-video-controls'
import Styled from './Styled'

export const VideoContext = React.createContext()

const VideoNode = memo(({ url, poster, controls, muteToggle, playing }) => {
  return (
    <Styled.VideoProvider src={url} muted={!controls} poster={poster}>
      <Player
        shouldPlay={playing}
        muteToggle={muteToggle}
        controlsEnabled={controls}
      />
    </Styled.VideoProvider>
  )
})

function useAutoplay(shouldPlay) {
  const { controls } = useContext(VideoCtx)
  useEffect(
    () => {
      if (shouldPlay) {
        controls.play()
      } else {
        controls.pause()
      }
    },
    [shouldPlay]
  )
}

const PlayerCtx = createContext()
function Player({ shouldPlay, muteToggle, controlsEnabled }) {
  const { video, state, controls } = useContext(VideoCtx)
  const [hovered, setHovered] = useState()

  useAutoplay(shouldPlay)

  const muteEnabled = muteToggle && !controlsEnabled
  const ctrlsActive =
    (state.isPlaying && hovered) ||
    state.seeking ||
    (muteEnabled && state.muted)

  function toggleMute() {
    if (state.muted) controls.unmute()
    else controls.mute()
  }

  function handleClick(e) {
    e.stopPropagation()
    if (muteEnabled) return toggleMute()
    if (controlsEnabled)
      return state.isPlaying ? controls.pause() : controls.play()
    return null
  }

  return (
    <PlayerCtx.Provider value={{ toggleMute }}>
      <Styled.Wrapper
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Styled.ControlWrapper active={ctrlsActive}>
          {muteEnabled && <MuteToggle />}
          {controlsEnabled && <Controls />}
        </Styled.ControlWrapper>
        <div onClick={handleClick}>{video}</div>
      </Styled.Wrapper>
    </PlayerCtx.Provider>
  )
}

function MuteToggle() {
  const { state } = useContext(VideoCtx)
  const { toggleMute } = useContext(PlayerCtx)
  return <Styled.Mute muted={state.muted} onClick={toggleMute} />
}

function Controls() {
  const { state } = useContext(VideoCtx)
  const { duration, time } = state.formatted
  return (
    <>
      <Styled.SeekBar>
        <Styled.Progress />
      </Styled.SeekBar>
      <Styled.ControlsLayout>
        <Styled.ControlItem>
          <Styled.Time>
            <span>{time}</span>
            <span>{duration}</span>
          </Styled.Time>
        </Styled.ControlItem>
        <Styled.ControlItem>
          <MuteToggle />
        </Styled.ControlItem>
        <Styled.ControlItem>
          <Styled.Fullscreen />
        </Styled.ControlItem>
      </Styled.ControlsLayout>
    </>
  )
}

VideoNode.propTypes = {
  url: PropTypes.string.isRequired,
  poster: PropTypes.string,
  controls: PropTypes.bool,
  muteToggle: PropTypes.bool,
  playing: PropTypes.bool,
}

export default VideoNode
