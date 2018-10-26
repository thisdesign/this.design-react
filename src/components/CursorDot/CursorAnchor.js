import React, { Component } from 'react';

class CursorAnchor extends Component {
  handleHover = () => {
    // console.log('hovered');
  }

  render() {
    return (
      <div onMouseEnter={this.handleHover}>{this.props.children}</div>
    );
  }
}

export default CursorAnchor;
