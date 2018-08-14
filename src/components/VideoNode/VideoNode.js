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
  }

  componentDidMount() {
    if (this.props.controls) {
      this.getMetaData();
    }
  }

  getMetaData() {
    this.videoElem.current.addEventListener('loadedmetadata', () => {
      const elem = this.videoElem.current;
      if (elem) {
        const { duration } = elem;
        this.setState({ duration });
      }
    });
  }

  getCurrentTime() {
    const elem = this.videoElem.current;
    setInterval(() => {
      this.setState({ elapsed: elem.currentTime }, () => {
        this.setPercentage();
      });
    }, 30);
  }


  setPercentage = () => {
    this.setState({ percentComplete: (this.state.elapsed / this.state.duration) * 100 });
  }


  handleMuteToggle = () => {
    if (this.state.isMuted) {
      this.setState({ isMuted: false }, () => {
        this.videoElem.current.muted = false;
      });
    } else {
      this.setState({ isMuted: true }, () => {
        this.videoElem.current.muted = true;
      });
    }
  };

  leadingZero = num => `00${num}`.slice(-2);

  parseTime = (duration) => {
    const minutes = parseInt(duration / 60, 10);
    const seconds = (Math.floor(duration % 60));
    return `${minutes}:${this.leadingZero(seconds)}`;
  }

  handlePause = () => {
    if (this.state.isPaused) {
      this.setState({ isPaused: false }, () => {
        this.videoElem.current.play();
        this.getCurrentTime();
      });
    } else {
      this.setState({ isPaused: true }, () => {
        this.videoElem.current.pause();
      });
    }
  }

  render() {
    const {
      isMuted, duration, elapsed, isPaused, percentComplete,
    } = this.state;
    const { muteToggle, controls } = this.props;
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
    };

    return (
      <div className="videoNode" >
        <div
          className="videoNode_VideoWrapper"
          {...controls ? { onClick: this.handlePause } : null}
        >
          <video {...atts} >
            <source src={this.props.url} type="video/mp4" />
          </video>
        </div>
        { muteToggle &&
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
            percentComplete={percentComplete}
          /> }
      </div>
    );
  }
}

VideoNode.defaultProps = {
  controls: false,
  muteToggle: false,
};
