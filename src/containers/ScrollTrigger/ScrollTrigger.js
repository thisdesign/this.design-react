import React from 'react';
import ScrollContext from '../ScrollContext/ScrollContext';

class ScrollTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.target = React.createRef();
  }
  state = {
    active: false,
  }

  componentDidMount() {
    this.setPos();
  }

  componentDidUpdate() {
    this.setPos();
    this.checkIfActive();
  }

  setActive = (criteria) => {
    if (this.state.active !== criteria) {
      this.setState({ active: criteria });
    }
  }

  setPos = () => {
    this.offset = (this.props.offset / 100) * window.innerHeight;
    this.rect = this.target.current.getBoundingClientRect();
  }

  checkIfActive = () => {
    this.setActive(this.isBeyondTrigger());
  }

  isBeyondTrigger = () => this.rect.top - this.offset < 0

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
