import React from 'react'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'
import MuteControl from './MuteControl/MuteControl'
import VideoControls from './VideoControls/VideoControls'
import './VideoNode.scss'

export const VideoContext = React.createContext()
export default class VideoNode extends React.Component {
  static contextType = VideoContext
  static propTypes = {
    url: PropTypes.string.isRequired,
    poster: PropTypes.string,
    controls: PropTypes.bool,
    muteToggle: PropTypes.bool,
    playing: PropTypes.bool,
  }

  static defaultProps = {
    controls: false,
    muteToggle: false,
    poster: null,
    playing: true,
  }

  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  state = {
    muted: !this.props.controls && true,
    playing: this.props.controls ? false : this.props.playing,
    duration: 0,
    hasPlayed: false,
  }

  componentDidUpdate(prevProps) {
    this.handlePlayingUpdate(prevProps)
  }

  onHasPlayed = () => {
    this.setState({ hasPlayed: true })
  }

  onDuration = duration => {
    this.setState({ duration })
  }

  onProgress = state => {
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  onPause = () => {
    this.setState({ playing: false })
  }

  onPlay = () => {
    this.onHasPlayed()
    this.setState({ playing: true })
  }

  onClick = () => {
    if (this.props.controls) {
      return this.togglePlay()
    }
    return this.props.muteToggle ? this.toggleMuted() : null
  }

  onClickFullScreen = () => {
    const videoNode = this.ref.current.querySelector('video')
    if (videoNode.requestFullscreen) {
      videoNode.requestFullscreen()
    } else if (videoNode.mozRequestFullScreen) {
      videoNode.mozRequestFullScreen()
    } else if (videoNode.webkitRequestFullscreen) {
      videoNode.webkitRequestFullscreen()
    }
  }

  handlePlayingUpdate = prevProps => {
    if (prevProps.playing !== this.props.playing) {
      this.setState({ playing: this.props.playing })
    }
  }

  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  togglePlay = () => {
    if (this.state.playing) {
      this.onPause()
    } else {
      this.onPlay()
    }
  }

  render() {
    const {
      muted,
      playing,
      duration,
      played,
      playedSeconds,
      hasPlayed,
    } = this.state
    const { controls, poster, muteToggle, url } = this.props
    return (
      <VideoContext.Provider
        value={{
          duration,
          muted,
          toggleMuted: this.toggleMuted,
          onClickFullScreen: this.onClickFullScreen,
          playedSeconds: playedSeconds || 0,
          percentComplete: played || 0,
        }}
      >
        <div className="videoNode" ref={this.ref}>
          <ReactPlayer
            url={url}
            playing={playing}
            loop
            className="videoNode__videoWrapper"
            muted={muted}
            playsinline
            config={{
              file: { attributes: { poster }, class: 'videoNode__video' },
            }}
            width="100%"
            height="100%"
            onClick={this.onClick}
            onProgress={this.onProgress}
            onDuration={this.onDuration}
          />
          {controls && (
            <VideoControls hasPlayed={hasPlayed} isPaused={!playing} />
          )}
          {!controls && muteToggle && (
            <SoloMute isMuted={muted} toggleMuted={this.toggleMuted} />
          )}
        </div>
      </VideoContext.Provider>
    )
  }
}

const SoloMute = ({ isMuted, toggleMuted }) => (
  <div className="videoNode__muteButtonSolo">
    <MuteControl isMuted={isMuted} toggleMuted={toggleMuted} />
  </div>
)
