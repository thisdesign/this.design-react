import Loading from 'components/Loading/Loading';
import React, { Component } from 'react';
import isMobile from '../../util/isMobile';
import './Homepage.css';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
  }

  state = {
    videoLoaded: false,
  }

  componentDidMount() {
    this.video.current.onloadeddata = () => {
      this.setState({ videoLoaded: true });
    };
  }
  render() {
    const { data } = this.props.data;
    const { image } = data;
    const videoURLs = data.video_group.map(vid => vid.link.url);
    const randomUrl = videoURLs[Math.floor(Math.random() * videoURLs.length)];
    const { videoLoaded } = this.state;

    return (
      <div className="homepage">
        {!videoLoaded && <Loading />}
        <div className="homepage__inner">
          {!isMobile()
            ? (
              <video autoPlay loop muted className="homepage__inner__video" ref={this.video}>
                <source src={randomUrl} type="video/mp4" />
              </video>
            ) : <img className="homepage__inner__image" src={image.url} alt={image.alt} />
          }
        </div>
      </div>
    );
  }
}


export default Homepage;
