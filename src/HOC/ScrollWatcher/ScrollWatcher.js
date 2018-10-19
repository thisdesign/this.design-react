import React from 'react';

/**
 * @TODO: look at  https://hackernoon.com/do-you-still-register-window-event-listeners-in-each-component-react-in-example-31a4b1f6f1c8
 * - get inView correct
 * - use ref instead of queryselector
 * - unmount watch probably
 * - add +/- bias (eg: dont animate until 200px inview)
 */

class ScrollWatcher extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  state = {
    inView: false,
  }

  componentDidMount() {
    this.container = document.querySelector('.-is-active'); // fix this
    this.container.addEventListener('scroll', this.isElementInViewport);
  }

  isElementInViewport = () => {
    const rect = this.ref.current.getBoundingClientRect();
    const isInView = rect.y < 0 + window.innerHeight;

    if (isInView) {
      this.setState({ inView: true }, () => { });
    }
  }

  render() {
    const classes = [
      this.props.className,
      this.state.inView ? '-inView' : '',
    ].join(' ');


    return (
      <div className={classes} ref={this.ref}>
        {this.props.children}
      </div>
    );
  }
}

export default ScrollWatcher;
