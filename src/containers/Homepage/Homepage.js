import React, { Component } from 'react';
import Loading from 'components/Loading/Loading';
import isMobile from 'util/isMobile';
import LayoutContext from 'containers/Layout/LayoutContext';
import PropTypes from 'prop-types';
import './Homepage.css';

class Homepage extends Component {
  static contextType = LayoutContext;

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
    const { notFound, siteInfo } = this.context;
    if (notFound) { console.log('Not found'); }
    const urls = siteInfo.data[isMobile() ? 'video_group_mobile' : 'video_group'].map(vid => vid.link.url);
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
