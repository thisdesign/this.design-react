import React from 'react';
import './Instagram.scss';

export default class Instagram extends React.Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI() {
    const count = 9;
    const token = '3688536766.d35a26c.42cc89b44e6f497ea2a4feb2615ac5e6';
    const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${token}&count=${count}`;

    fetch(url)
      .then(res => res.json())
      .then(doc => (doc && doc.data) && this.setState({ data: doc.data }));
  }

  render() {
    const { data } = this.state;
    if (data) {
      const urls = data.map(img => img.images.standard_resolution.url);
      const images = urls.map(url => <img className="about__instagram__item" src={url} key={url} alt={url} />);
      return (
        <div className="about__instagram -wrap">
          {images}
        </div>
      );
    }
    return null;
  }
}
