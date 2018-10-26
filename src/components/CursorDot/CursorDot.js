import React, { Component } from 'react';
import './CursorDot.css';

class CursorDot extends Component {
  componentDidMount() {
    this.addListener();
  }
  componentWillUnmount() {
    this.removeListener();
  }

  handleMouseMove = (e) => {
    this.mouseY = e.clientY;
    this.mouseX = e.clientX;
    this.calculateStyle();
  };

  calculateStyle = () => {
    const transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0)`;
    this.el.style.transform = transform;
  }

  addListener = () => {
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  removeListener = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        <div
          className={`cursorDot ${this.props.enabled ? 'cursorDot__enabled' : ''}`}
          style={{ ...this.coords }}
          ref={(el) => { this.el = el; }}
        />
      </React.Fragment>
    );
  }
}

export default CursorDot;
