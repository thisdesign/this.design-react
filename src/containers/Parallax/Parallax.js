import React from 'react';
// import isInView from 'util/isInView';
import ScrollContext from '../ScrollContainer//ScrollContext/ScrollContext';

export default class Parallax extends React.Component {
  static contextType = ScrollContext;

  // constructor(props) {
  //   super(props);
  //   this.target = React.createRef();
  //   this.latestKnownScrollY = 0;
  //   this.ticking = false;
  // }
  //
  // componentDidMount() {
  //   this.watchScroll();
  //   requestAnimationFrame(this.update);
  // }
  //
  // componentWillUnmount() {
  //   this.unWatchScroll();
  // }
  //
  // onScroll = () => {
  //   if (this.isInView()) {
  //     this.latestKnownScrollY = this.getContainer().scrollTop;
  //     this.requestTick();
  //   }
  // }
  //
  // setOffset = () => {
  //   const tr = `translate3d(0, ${this.getOffset()}px, 0`;
  //   this.target.current.style.transform = tr;
  // }
  //
  // getContainer = () => this.context.container.current
  //
  // getRect = () => this.target.current.getBoundingClientRect()
  //
  // getOffset = () => {
  //   const { height, top } = this.getRect();
  //   const { speed } = this.props;
  //   const offset = (top + (height / 2)) - (window.innerHeight / 2);
  //   return offset / -speed;
  // }
  //
  // isInView = () => isInView(this.getRect(), 0);
  //
  // watchScroll = () => {
  //   this.getContainer().addEventListener('scroll', this.onScroll);
  // }
  //
  // unWatchScroll = () => {
  //   this.getContainer().removeEventListener('scroll', this.onScroll);
  // }
  //
  // update = () => {
  //   this.setOffset();
  //   this.ticking = false;
  // }
  //
  // requestTick = () => {
  //   if (!this.ticking) {
  //     requestAnimationFrame(this.update);
  //     this.ticking = true;
  //   }
  // }
  //

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

// https://gist.github.com/paulmillr/3118943
