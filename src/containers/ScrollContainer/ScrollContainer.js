import React from 'react';
import ScrollContext from '../ScrollContext/ScrollContext';
// import ScrollProvider from '../ScrollProvider/ScrollProvider';


export default class ScrollContainer extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  state = {
    scrollTop: 0,
  }

  componentDidMount() {
    // throttle this
    this.container.current.addEventListener('scroll', this.logPosition);
  }

  logPosition = () => {
    this.setState({ scrollTop: this.container.current.scrollTop });
  }

  render() {
    const { children, className } = this.props;
    return (
      <section className={className} ref={this.container}>
        <ScrollContext.Provider value={{ scrollTop: this.state.scrollTop }}>
          {children}
        </ScrollContext.Provider>
      </section>
    );
  }
}
