import React from 'react';
import './VideoNode.css';
import MuteControl from './MuteControl/MuteControl';
import VideoControls from './VideoControls/VideoControls';

export default class VideoNode extends React.Component {
  constructor(props) {
    super(props);
    this.videoElem = React.createRef();
  }

  state = {
    isMuted: !this.props.controls,
    isPaused: true,
    duration: 0,
    elapsed: 0,
    percentComplete: 0,
    hasPlayed: false,
    // If autoplay dont play until in view & pause when out of view
  }

  componentDidMount() {
    if (this.props.controls) {
      this.onMetaDataLoad(() => {
        this.setMetaData();
      });
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  onMetaDataLoad = (callback) => {
    this.getElem().addEventListener('loadedmetadata', () => {
      callback();
    });
  }

  setMetaData() {
    this.setState({ duration: this.getDuration() });
  }

  getElem = () => this.videoElem.current

  getElapsed = () => this.getElem().currentTime;

  getDuration = () => this.getElem().duration

  getPercentComplete = () => (this.getElapsed() / this.getDuration()) * 100

  stopTimer = () => {
    clearInterval(this.interval);
  }

  pauseVideo = () => {
    this.stopTimer();
    this.getElem().pause();
  }

  playVideo = () => {
    this.updateCurrentTime();
    this.getElem().play();
  }

  handleMuteToggle = () => {
    this.setState((prevState) => {
      this.videoElem.current.muted = !prevState.isMuted;
      return {
        isMuted: !prevState.isMuted,
      };
    });
  };

  leadingZero = num => `00${num}`.slice(-2);

  parseTime = (duration) => {
    const minutes = parseInt(duration / 60, 10);
    const seconds = (Math.floor(duration % 60));
    return `${minutes}:${this.leadingZero(seconds)}`;
  }

  updateCurrentTime() {
    this.interval = setInterval(() => {
      this.setState({
        elapsed: this.getElapsed(),
        percentComplete: this.getPercentComplete(),
      });
    }, 30);
  }

  handlePause = () => {
    this.setState((prevState) => {
      if (prevState.isPaused) {
        this.playVideo();
      } else {
        this.pauseVideo();
      }
      return {
        isPaused: !prevState.isPaused,
        hasPlayed: true,
      };
    });
  }

  handleFullScreen = () => {
    if (this.videoElem.current.requestFullscreen) {
      this.videoElem.current.requestFullscreen();
    } else if (this.videoElem.current.mozRequestFullScreen) {
      this.videoElem.current.mozRequestFullScreen();
    } else if (this.videoElem.current.webkitRequestFullscreen) {
      this.videoElem.current.webkitRequestFullscreen();
    }
  }

  render() {
    const {
      isMuted, duration, elapsed, isPaused, percentComplete, hasPlayed,
    } = this.state;
    const { muteToggle, controls, poster } = this.props;
    const atts = {
      ...controls
        ? {
          autoPlay: false,
          muted: false,
          loop: false,
        }
        : {
          autoPlay: true,
          muted: true,
          loop: true,
        },
      ref: this.videoElem,
      className: 'videoNode__video',
      playsInline: true,
      poster,
    };

    return (
      <div className="videoNode" >
        <div
          className="videoNode__videoWrapper"
          {...controls ? { onClick: this.handlePause } : null}
        >
          <video {...atts} >
            <source src={this.props.url} type="video/mp4" />
          </video>
        </div>
        { (!controls && muteToggle) &&
          <div className="videoNode__muteButtonSolo">
            <MuteControl
              isMuted={isMuted}
              handleMuteToggle={this.handleMuteToggle}
            />
          </div>
        }

        { controls &&
          <VideoControls
            duration={this.parseTime(duration)}
            elapsed={this.parseTime(elapsed)}
            isPaused={isPaused}
            isMuted={isMuted}
            handleMuteToggle={this.handleMuteToggle}
            handleFullScreen={this.handleFullScreen}
            percentComplete={percentComplete}
            hasPlayed={hasPlayed}
          /> }
      </div>
    );
  }
}

VideoNode.defaultProps = {
  controls: false,
  muteToggle: false,
};
