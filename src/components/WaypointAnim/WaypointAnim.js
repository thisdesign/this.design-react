import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import './WaypointAnim.css';

export default class WaypointAnim extends React.Component {
  state = {
    visible: false,
  }

  render() {
    const classNames = [
      this.props.className,
      `-waypointAnim--${this.props.name}`,
      this.state.visible ? '-enabled' : '',
    ].join(' ');
    return (
      <Waypoint
        onEnter={() => this.setState({ visible: true })}
        onLeave={() => this.setState({ visible: false })}
      >
        <div className={classNames}>
          {this.props.children}
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
