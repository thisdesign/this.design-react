import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import MuteControl from './MuteControl/MuteControl';
import VideoControls from './VideoControls/VideoControls';
import './VideoNode.scss';

export default class VideoNode extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    poster: PropTypes.string,
    controls: PropTypes.bool,
    muteToggle: PropTypes.bool,
  };

  static defaultProps = {
    controls: false,
    muteToggle: false,
    poster: null,
  };

  state = {
    muted: true,
    playing: !this.props.controls,
    duration: 0,
    hasPlayed: false,
  }

  onHasPlayed = () => {
    this.setState({ hasPlayed: true });
  }

  onDuration = (duration) => {
    this.setState({ duration });
  }

  onProgress = (state) => {
    if (!this.state.seeking) {
      this.setState(state);
    }
  }

  onPause = () => {
    this.setState({ playing: false });
  }

  onPlay = () => {
    this.onHasPlayed();
    this.setState({ playing: true });
  }

  onClick = () => {
    if (this.props.controls) {
      return this.togglePlay();
    }
    return this.props.muteToggle ? this.toggleMuted() : null;
  }

  toggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  }

  togglePlay = () => {
    if (this.state.playing) { this.onPause(); } else { this.onPlay(); }
  }

  render() {
    console.log(this.state);
    const {
      muted, playing, duration, played, playedSeconds, hasPlayed,
    } = this.state;
    const {
      controls, poster, muteToggle, url,
    } = this.props;
    return (
      <div className="videoNode" >
        <ReactPlayer
          url={url}
          playing={playing}
          loop
          className="videoNode__videoWrapper"
          muted={muted}
          playsinline
          config={{ file: { attributes: { poster }, class: 'videoNode__video' } }}
          width="100%"
          height="100%"
          onClick={this.onClick}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
        />

        {controls &&
          <VideoControls
            duration={duration}
            playedSeconds={playedSeconds}
            percentComplete={played}
            handleFullScreen={null}
            isPaused={!playing}
            hasPlayed={hasPlayed}
            isMuted={muted}
          />
        }
        {(!controls && muteToggle) &&
          <SoloMute isMuted={muted} toggleMuted={this.toggleMuted} />
        }
      </div>
    );
  }
}

const SoloMute = ({ isMuted, toggleMuted }) => (
  <div className="videoNode__muteButtonSolo">
    <MuteControl isMuted={isMuted} toggleMuted={toggleMuted} />
  </div>
);
