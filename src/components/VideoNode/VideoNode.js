import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import VideoProvider, { VideoCtx } from 'react-video-controls'
// import ReactPlayer from 'react-player'
// import MuteControl from './MuteControl/MuteControl'
// import VideoControls from './VideoControls/VideoControls'

export const VideoContext = React.createContext()

const VideoNode = memo(({ url, poster, controls, muteToggle, playing }) => {
  console.log({ url, poster, controls, muteToggle, playing })
  return (
    <VideoProvider src={url} muted poster={poster}>
      <Video
        shouldPlay={playing}
        muteToggle={muteToggle}
        controlsEnabled={controls}
      />
    </VideoProvider>
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

function Video({ shouldPlay, muteToggle, controlsEnabled }) {
  const { video } = useContext(VideoCtx)
  useAutoPlay(shouldPlay)

  return (
    <div>
      {muteToggle && !controlsEnabled && <MuteToggle />}
      {controlsEnabled && <Controls />}
      {video}
    </div>
  )
}

function MuteToggle() {
  return 'MUTE TOGGLE'
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
