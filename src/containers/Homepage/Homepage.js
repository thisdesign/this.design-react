import Loading from 'components/Loading/Loading';
import isMobile from 'util/isMobile';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Homepage.css';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
  }

  state = {
    videoLoaded: null,
  }

  componentDidMount() {
    if (this.video && this.video.current) {
      this.hideVideoLoad();
    }
  }

  hideVideoLoad = () => {
    this.setState({ videoLoaded: false }, () => {
      this.showVideoOnLoad();
    });
  }

  showVideoOnLoad = () => {
    this.video.current.onloadeddata = () => {
      this.setState({ videoLoaded: true });
    };
  }

  render() {
    if (this.props.notFound) { // find a ui solve for this
      console.log('Not found');
    }
    const videos = isMobile()
      ? this.props.data.data.video_group_mobile
      : this.props.data.data.video_group;
    const urls = videos.map(vid => vid.link.url);
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];
    const videoLoaded = this.state.videoLoaded !== false;
    return (
      <div className="homepage">
        {!videoLoaded && <Loading />}
        <div className="homepage__inner">
          <video autoPlay loop muted playsInline className="homepage__inner__video" ref={this.video}>
            <source src={randomUrl} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}


Homepage.defaultProps = {
  data: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
};

export default Homepage;
