import React from 'react';
import isInView from 'util/isInView';
import isMobile from 'util/isMobile';
import ScrollContext from '../ScrollContainer//ScrollContext/ScrollContext';

class Parallax extends React.Component {
  constructor(props) {
    super(props);
    this.target = React.createRef();
  }

  state = {
    isInView: false,
  }

  componentDidUpdate() {
    if (this.parallaxIsEnabled()) {
      this.executeParallax();
    }
  }

  setIsInView = (rect) => {
    if (isInView(rect) !== this.state.isInView) {
      this.setState({ isInView: isInView(rect) });
    }
  }

  executeParallax = () => {
    this.updatePosition((rect) => {
      this.setIsInView(rect);
    });
  }

  parallaxIsEnabled = () => !isMobile() && !this.props.forceMobile;

  updatePosition = (callback) => {
    const rect = this.target.current.getBoundingClientRect();
    const offset = ((rect.top + rect.height) / 2) - (window.innerHeight / 2);
    const { speed } = this.props;
    this.offset = offset / -speed;

    callback(rect);
  }

  render() {
    const style = this.state.isInView
      ? { transform: `translate(0, ${this.offset}px` }
      : null;

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
    {context => <Parallax {...props} scrollTop={context.scrollTop} ref={ref} />}
  </ScrollContext.Consumer>
));

// https://github.com/facebook/react/issues/12397#issuecomment-375501574
