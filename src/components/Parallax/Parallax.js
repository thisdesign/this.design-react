import React from 'react';
import ParallaxController from './libs/ParallaxController';

export default class Parallax extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const el = this.ref.current;
    const container = document.querySelector('.casestudy');

    this.controller = new ParallaxController({ container, el });
    this.controller.init();
    console.log(this.controller);
  }

  componentWillUnmount() {
    this.controller.destroy();
  }

  render() {
    const {
      children,
      className,
    } = this.props;
    const {
      ref,
    } = this;

    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    );
  }
}
