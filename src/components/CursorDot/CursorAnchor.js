import React from 'react';
import propTypes from 'prop-types';
import icons from './icons';

export default class CursorAnchor extends React.Component {
  state= {
    hovered: false,
  }

  enableHover = () => {
    this.setState({ hovered: true });
  };

  disableHover = () => {
    this.setState({ hovered: false });
  };

  render() {
    return (
      <div onMouseEnter={this.enableHover} onMouseLeave={this.disableHover} className="cursorAnchor">
        {this.props.children}
        <div className="cursorAnchor__wrapper">
          <div className={`cursor__text ${this.state.hovered && 'cursor__text--enabled'}`}>
            { icons[this.props.textId] }
          </div>
        </div>
      </div>
    );
  }
}

CursorAnchor.propTypes = {
  textId: propTypes.string.isRequired,
};
