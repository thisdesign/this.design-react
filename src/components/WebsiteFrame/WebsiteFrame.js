/*

Future: Make HOC for percentage based border radii

*/

import React from 'react';
import './WebsiteFrame.css';

export default class WebsiteFrame extends React.Component {
  constructor(props) {
    super(props);
    this.frame = React.createRef();
  }

  state = { radius: 0 }

  componentDidMount() {
    if (this.frame) {
      const radius = this.frame.current.clientWidth / 150;
      this.setState({ radius });
    }
  }

  render() {
    const dotColor = this.props.dotColor || '#fff';
    const frameColor = this.props.frameColor || '#D8D8D8';

    return (
      <div className="websiteFrame" ref={this.frame} style={{ borderRadius: `${this.state.radius}px` }}>
        <svg viewBox="0 0 632 20" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
          <path fill={frameColor} d="M0 0h632v20H0z" />
          <circle fill={dotColor} cx="10" cy="10" r="2.75" />
          <circle fill={dotColor} cx="21" cy="10" r="2.75" />
          <circle fill={dotColor} cx="32" cy="10" r="2.75" />
        </svg>
        {this.props.render}
      </div>
    );
  }
}
