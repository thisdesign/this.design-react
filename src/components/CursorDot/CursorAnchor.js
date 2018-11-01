import React from 'react';
import isMobile from 'util/isMobile';
import CursorContext from 'components/CursorDot/CursorContext';
import propTypes from 'prop-types';
import icons from './icons';

export default class CursorAnchor extends React.Component {
  static contextType = CursorContext;

  state= {
    hovered: false,
  }

  componentWillMount() {
    if (!(this.props.textId in icons)) {
      console.error(`${this.props.textId} was not found in icons.js`); // eslint-disable-line
    }
  }


  enableHover = () => {
    this.context.updateCursor({
      enabled: true,
      icon: this.props.detached && this.props.textId,
    });
    this.setState({ hovered: true });
  };

  disableHover = () => {
    this.setState({ hovered: false });
    this.context.updateCursor({
      enabled: false,
      icon: null,
    });
  };

  render() {
    if (!isMobile) {
      return (
        <div
          onMouseEnter={this.enableHover}
          onClick={this.disableHover}
          onMouseLeave={this.disableHover}
          className="cursorAnchor"
        >
          {this.props.children}
          {!this.props.detached &&
          <div className="cursorAnchor__wrapper">
            <div className={`cursor__text ${this.state.hovered && 'cursor__text--enabled'}`}>
              { icons[this.props.textId] }
            </div>
          </div>
            }
        </div>
      );
    }
    return this.props.children;
  }
}

CursorAnchor.defaultProps = {
  detached: false,
};

CursorAnchor.propTypes = {
  textId: propTypes.string.isRequired,
  detached: propTypes.bool,
};
