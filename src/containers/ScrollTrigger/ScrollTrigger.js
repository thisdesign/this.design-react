import React from 'react';
import ScrollContext from '../ScrollContext/ScrollContext';

/**
 * <
 */
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
  }

  setPos = () => {
    const offset = 0; // percent of browser height change to props
    this.windowHeight = window.innerHeight;
    this.scrollTop = this.props.scrollTop;
    this.triggerLocation = this.scrollTop + this.windowHeight + offset;
    this.rect = this.target.current.getBoundingClientRect();
  }

  render() {
    const className = [
      this.props.className || null,
      this.state.active ? '-active' : '',
    ];


    return (
      <div className={`${className}`} ref={this.target}>
        {this.props.children}
      </div>
    );
  }
}


export default React.forwardRef((props, ref) => (
  <ScrollContext.Consumer>
    {context => <ScrollTrigger {...props} scrollTop={context.scrollTop} ref={ref} />}
  </ScrollContext.Consumer>
));


// https://github.com/facebook/react/issues/12397#issuecomment-375501574
