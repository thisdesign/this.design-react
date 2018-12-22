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

  handleClick = () => {
    if (this.props.onClick) { this.props.onClick(); }
    this.disableHover();
  }

  render() {
    const {
      className, detached, children, textId,
    } = this.props;

    const AttachedCursor = () => (
      <div className="cursorAnchor__wrapper">
        <div className={`cursor__text ${this.state.hovered && 'cursor__text--enabled'}`}>
          { icons[textId] }
        </div>
      </div>
    );

    if (!isMobile()) {
      return (
        <div
          onMouseEnter={this.enableHover}
          onClick={this.handleClick}
          onMouseLeave={this.disableHover}
          className={`${className} cursorAnchor`}
        >
          {children}
          {!detached && <AttachedCursor />}
        </div>
      );
    }
    return (
      <div
        onClick={this.props.onClick}
        className={`${className && className} cursorAnchor`}
      >
        {children}
      </div>
    );
  }
}

CursorAnchor.defaultProps = {
  detached: false,
};

CursorAnchor.propTypes = {
  textId: propTypes.string.isRequired,
  detached: propTypes.bool,
};
