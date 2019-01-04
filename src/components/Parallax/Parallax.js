import React from 'react';
import ParallaxController from './libs/ParallaxController';

export default class Parallax extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.controller = new ParallaxController({
      container: document.querySelector('.casestudy'),
      el: this.ref.current,
    }).init();
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
