import React from 'react';
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
    return (
      <div onMouseEnter={this.enableHover} onMouseLeave={this.disableHover} className="cursorAnchor">
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
}

CursorAnchor.defaultProps = {
  detached: false,
};

CursorAnchor.propTypes = {
  textId: propTypes.string.isRequired,
  detached: propTypes.bool,
};
