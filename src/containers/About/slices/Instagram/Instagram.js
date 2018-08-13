import React from 'react';
import './Instagram.css';

export default class Instagram extends React.Component {
  constructor(props) {
    super(props);
    this.aboutIsVisible = props.view === 'about';
  }
  state = {
    doc: null,
    notFound: false,
  };

  componentWillMount() {
    if (this.aboutIsVisible) {
      this.fetchAPI();
    }
  }

  fetchAPI() {
    const count = 9;
    const token = '3688536766.d35a26c.42cc89b44e6f497ea2a4feb2615ac5e6';
    const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${token}&count=${count}`;

    fetch(url)
      .then(res => res.json())
      .then(doc => this.setState({ doc }));
  }

  render() {
    const { notFound, doc } = this.state;
    if (doc && !notFound) {
      if (doc.data) {
        const urls = doc.data.map(img => img.images.standard_resolution.url);
        const images = urls.map(url => <img className="about__instagram__item" src={url} key={url} alt={url} />);
        return (
          <div className="about__instagram -wrap">
            {images}
          </div>
        );
      }
    }
    return null;
  }
}
