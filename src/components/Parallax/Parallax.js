import React from 'react';

export default class Parallax extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.el = this.ref.current;
    this.container = document.querySelector('.casestudy');
    this.addListener();
  }

  setOffset = () => {
    const bounds = this.getBounds();
    const idk = ((bounds.top + bounds.height) / 2) - (window.innerHeight / 2);
    const offset = (-idk / 4);
    this.el.style.transform = `translate3d(0,${offset}px, 0)`;
  }

  getBounds = () => this.el.getBoundingClientRect();

  addListener = () => {
    this.container.addEventListener(
      'scroll',
      this.setOffset,
      { passive: true },
    );
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
