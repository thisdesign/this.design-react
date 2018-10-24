import React from 'react';
import isInView from 'util/isInView';
import ScrollContext from '../ScrollContainer/ScrollContext/ScrollContext';

class ScrollTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.target = React.createRef();
  }
  state = {
    active: false,
  }

  componentDidMount() {
    this.setCondition();
  }

  componentDidUpdate(prevProps) {
    if (this.props.scrollTop !== prevProps.scrollTop) {
      this.setCondition();
    }
  }

  setCondition = () => {
    if (this.conditionChanged()) {
      this.runTriggerMethods();
      this.setState({ active: this.meetsCriteria() });
    }
  }

  getOffset = () => (this.props.offset / 100) * window.innerHeight;

  getRect = () => this.target.current.getBoundingClientRect();

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
    const offset = this.getOffset();
    const rect = this.getRect();

    if (this.props.inView) {
      return isInView(rect, offset);
    }
    return this.isBeyondTrigger();
  }

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
    {context => <ScrollTrigger {...props} scrollTop={context.scrollTop} ref={ref} />}
  </ScrollContext.Consumer>
));

// https://github.com/facebook/react/issues/12397#issuecomment-375501574
