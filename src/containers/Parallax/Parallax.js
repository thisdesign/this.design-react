import React from 'react';
import isInView from 'util/isInView';
import throttle from 'lodash.throttle';
import ScrollContext from '../ScrollContainer//ScrollContext/ScrollContext';

class Parallax extends React.Component {
  constructor(props) {
    super(props);
    this.target = React.createRef();
    this.throttledParalax = throttle(this.initParallax, 1000 / 30);
  }

  componentDidMount() {
    this.watchScroll();
  }

  componentWillUnmount() {
    this.unWatchScroll();
  }

  setOffset = () => {
    const tr = `translate3d(0, ${this.getOffset()}px, 0`;
    this.target.current.style.transform = tr;
  }

  getContainer = () => this.props.container.current

  getRect = () => this.target.current.getBoundingClientRect()


  getOffset = () => {
    const { height, top } = this.getRect();
    const offset = (top + (height / 2)) - (window.innerHeight / 2);
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
    return (
      <div
        className={this.props.className || null}
        ref={this.target}
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
