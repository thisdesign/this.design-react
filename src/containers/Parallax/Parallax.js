import React from 'react';
import ScrollContext from '../ScrollContext/ScrollContext';

class Parallax extends React.Component {
  constructor(props) {
    super(props);
    this.target = React.createRef();
  }

  componentDidUpdate() {
    const { top, height } = this.target.current.getBoundingClientRect();
    const offset = ((top + height) / 2) - (window.innerHeight / 2);
    const { speed } = this.props;
    this.offset = offset / -speed;
  }

  render() {
    return (
      <div
        className={this.props.className || null}
        ref={this.target}
        style={{ transform: `translate(0, ${this.offset}px` }}
      >
        {this.props.children}
      </div>
    );
  }
}

Parallax.defaultProps = {
  speed: 4,
};

export default React.forwardRef((props, ref) => (
  <ScrollContext.Consumer>
    {context => <Parallax {...props} scrollTop={context.scrollTop} ref={ref} />}
  </ScrollContext.Consumer>
));

// https://github.com/facebook/react/issues/12397#issuecomment-375501574
