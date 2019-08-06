import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import VideoProvider, { VideoCtx } from 'react-video-controls'
// import ReactPlayer from 'react-player'
// import MuteControl from './MuteControl/MuteControl'
// import VideoControls from './VideoControls/VideoControls'

export const VideoContext = React.createContext()

const VideoNode = memo(({ url, poster, controls, muteToggle, playing }) => {
  console.log(url, playing)
  return (
    <VideoProvider src={url}>
      <Video playing={playing} />
    </VideoProvider>
  )
})

function Video({ playing }) {
  const { video, controls } = useContext(VideoCtx)

  if (playing) {
    controls.play()
  } else {
    controls.pause()
  }

  return <div>{video}</div>
}

VideoNode.PropTypes = {
  url: PropTypes.string.isRequired,
  poster: PropTypes.string,
  controls: PropTypes.bool,
  muteToggle: PropTypes.bool,
  playing: PropTypes.bool,
}
export default VideoNode
