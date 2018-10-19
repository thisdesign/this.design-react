import React from 'react';

export default class ScrollProvider extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }
  componentDidMount() {
    // throttle this
    this.container.current.addEventListener('scroll', this.logPosition);
  }

  logPosition = () => {
    console.log(this.container.current.scrollTop);
  }

  render() {
    const { children, className } = this.props;
    return (
      <section className={className} ref={this.container}>
        {children}
      </section>
    );
  }
}
