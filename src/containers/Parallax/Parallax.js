import React from 'react';
import isInView from 'util/isInView';
import throttle from 'lodash.throttle';
import ScrollContext from '../ScrollContainer//ScrollContext/ScrollContext';

class Parallax extends React.Component {
  constructor(props) {
    super(props);
    this.target = React.createRef();
    this.throttledParalax = throttle(this.initParallax, 100);
  }

  state = {
    offset: 0,
  }

  componentDidMount() {
    this.watchScroll();
  }

  componentWillUnmount() {
    this.unWatchScroll();
  }

  setOffset = () => {
    this.setState({
      offset: this.getOffset(),
    });
  }

  getContainer = () => this.props.container.current

  getRect = () => this.target.current.getBoundingClientRect()


  getOffset = () => {
    const { height, top } = this.getRect();
    const offset = ((top + height) / 2) - (window.innerHeight / 2);
    const { speed } = this.props;
    return offset / -speed;
  }

  isInView = () => isInView(this.getRect(), 0);

  watchScroll = () => {
    this.getContainer().addEventListener('scroll', this.throttledParalax);
  }

  unWatchScroll = () => {
    this.getContainer().removeEventListener('scroll', this.throttledParalax);
  }

  initParallax = () => {
    if (this.isInView()) {
      this.setOffset();
    }
  }

  render() {
    const style = { transform: `translate(0, ${this.state.offset}px` };

    return (
      <div
        className={this.props.className || null}
        ref={this.target}
        style={style}
      >
        {this.props.children}
      </div>
    );
  }
}

Parallax.defaultProps = {
  speed: 4,
  forceMobile: false,
};

export default React.forwardRef((props, ref) => (
  <ScrollContext.Consumer>
    {context => <Parallax {...props} container={context.container} ref={ref} />}
  </ScrollContext.Consumer>
));

// https://github.com/facebook/react/issues/12397#issuecomment-375501574
