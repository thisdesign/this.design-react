import React from 'react';
import throttle from 'lodash.throttle';
import isInView from 'util/isInView';
import ScrollContext from '../ScrollContainer/ScrollContext/ScrollContext';

class ScrollTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.target = React.createRef();
    this.throttledSetCondition = throttle(this.setCondition, 100);
  }
  state = {
    active: false,
  }

  componentDidMount() {
    this.setCondition();
    this.watchScroll();
  }

  componentWillUnmount() {
    this.unWatchScroll();
  }

  setCondition = () => {
    if (this.conditionChanged()) {
      this.runTriggerMethods();
      this.setState({ active: this.meetsCriteria() });
    }
  }

  getOffset = () => (this.props.offset / 100) * window.innerHeight;

  getRect = () => this.target.current.getBoundingClientRect();

  getContainer = () => this.props.container.current

  watchScroll = () => {
    this.getContainer().addEventListener('scroll', this.throttledSetCondition);
  }

  unWatchScroll = () => {
    this.getContainer().removeEventListener('scroll', this.throttledSetCondition);
  }

  runTriggerMethods = () => {
    const { onEnter, onExit } = this.props;
    if (onEnter && this.meetsCriteria()) {
      onEnter();
    } else if (onExit && !this.meetsCriteria()) {
      onExit();
    }
  }

  conditionChanged = () => this.state.active !== this.meetsCriteria()

  meetsCriteria = () => {
    if (this.props.inView) {
      return this.isInView();
    }
    return this.isBeyondTrigger();
  }

  isInView = () => isInView(this.getRect(), this.getOffset());

  isBeyondTrigger = () => this.getRect().top - this.getOffset() < 0

  render() {
    const className = [
      this.props.className || null,
      this.state.active ? '-active' : '',
    ].join(' ');

    return (
      <div className={`${className}`} ref={this.target}>
        {this.props.children}
      </div>
    );
  }
}

ScrollTrigger.defaultProps = {
  offset: 0,
  onEnter: null,
  onExit: null,
};

export default React.forwardRef((props, ref) => (
  <ScrollContext.Consumer>
    {context => <ScrollTrigger {...props} {...context} container={context.container} ref={ref} />}
  </ScrollContext.Consumer>
));

// https://github.com/facebook/react/issues/12397#issuecomment-375501574
