import React from 'react';
import ScrollContext from '../ScrollContext/ScrollContext';

export default class ScrollWatch extends React.Component {
  state = {
    active: true,
  }
  render() {
    const className = [
      this.props.className || null,
      this.state.active ? '-active' : '',
    ];

    return (
      <ScrollContext.Consumer>
        {context => (
          <div className={`${className}`}>
            {this.props.children}
            {context.scrollTop}
          </div>
        )}
      </ScrollContext.Consumer>
    );
  }
}
