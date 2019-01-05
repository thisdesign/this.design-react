import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import './WaypointAnim.scss';

export default class WaypointAnim extends React.Component {
  state = {
    visible: false,
  }

  render() {
    const {
      name,
      className,
      children,
      disabled,
    } = this.props;

    const classNames = [
      className,
      `-waypointAnim--${name}`,
      this.state.visible ? '-enabled' : '',
    ].join(' ');

    return (
      <Waypoint
        onEnter={() => this.setState({ visible: true })}
        onLeave={() => this.setState({ visible: false })}
        topOffset="0px"
        bottomOffset="0px"
      >
        <div className={!disabled ? classNames : className}>
          {children}
        </div>
      </Waypoint>
    );
  }
}

WaypointAnim.defaultProps = {
  name: 'fadeIn',
  className: '',
};
WaypointAnim.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
};
