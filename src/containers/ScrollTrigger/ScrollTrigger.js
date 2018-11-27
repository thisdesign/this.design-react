import React from 'react';
// import isInView from 'util/isInView';
// import ScrollContext from '../ScrollContainer/ScrollContext/ScrollContext';

export default class ScrollTrigger extends React.Component {
  // static contextType = ScrollContext;
  //
  // constructor(props) {
  //   super(props);
  //   this.target = React.createRef();
  //   this.latestKnownScrollY = 0;
  //   this.ticking = false;
  //   this.active = false;
  // }
  //
  // componentDidMount() {
  //   requestAnimationFrame(this.update);
  //   this.watchScroll();
  // }
  //
  // componentWillUnmount() {
  //   this.unWatchScroll();
  // }
  //
  // onScroll = () => {
  //   this.latestKnownScrollY = this.getContainer().scrollTop;
  //   this.requestTick();
  // }
  //
  // getOffset = () => (this.props.offset / 100) * window.innerHeight;
  //
  // getRect = () => this.target.current.getBoundingClientRect();
  //
  // getContainer = () => this.props.container.current
  //
  // setCondition = () => {
  //   if (this.conditionChanged()) {
  //     this.runTriggerMethods();
  //     if (!this.active) {
  //       this.active = true;
  //       this.target.current.classList.add('-active');
  //     } else {
  //       this.active = false;
  //       this.target.current.classList.remove('-active');
  //     }
  //   }
  // }
  //
  // update = () => {
  //   this.setCondition();
  //   this.ticking = false;
  // }
  //
  // requestTick = () => {
  //   if (!this.ticking) {
  //     requestAnimationFrame(this.update);
  //     this.ticking = true;
  //   }
  // }
  // watchScroll = () => {
  //   this.getContainer().addEventListener('scroll', this.onScroll);
  // }
  //
  // unWatchScroll = () => {
  //   this.getContainer().removeEventListener('scroll', this.onScroll);
  // }
  //
  // runTriggerMethods = () => {
  //   const { onEnter, onExit } = this.props;
  //   if (onEnter && this.meetsCriteria()) {
  //     onEnter();
  //   } else if (onExit && !this.meetsCriteria()) {
  //     onExit();
  //   }
  // }
  //
  // conditionChanged = () => this.active !== this.meetsCriteria()
  //
  // meetsCriteria = () => {
  //   if (this.props.inView) {
  //     return this.isInView();
  //   }
  //   return this.isBeyondTrigger();
  // }
  //
  // isInView = () => isInView(this.getRect(), this.getOffset());
  //
  // isBeyondTrigger = () => this.getRect().top - this.getOffset() < 0

  render() {
    const className = [
      this.props.className || null,
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


// https://github.com/facebook/react/issues/12397#issuecomment-375501574
