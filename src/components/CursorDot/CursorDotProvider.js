import React, { Component } from 'react';
import './CursorDot.css';
import icons from './icons';

class CursorDot extends Component {
  state = {
    icon: 'close',
  }
  componentDidMount() {
    this.addListener();
  }
  componentWillUnmount() {
    this.removeListener();
  }

  handleMouseMove = (e) => {
    this.y = e.clientY;
    this.x = e.clientX;
    this.calculateStyle();
  };

  calculateStyle = () => {
    const { x, y } = this;
    const transform = `translate3d(${x}px, ${y}px, 0)`;
    this.el.classList.remove('-noMouse');
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
          className={`cursorDot ${this.props.enabled ? 'cursorDot__enabled' : ''} -noMouse`}
          style={{ ...this.coords }}
          ref={(el) => { this.el = el; }}
        >
          {icons[this.state.icon] &&
            <div className="cursorDot__overlay">
              {icons[this.state.icon]}
            </div>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default CursorDot;
