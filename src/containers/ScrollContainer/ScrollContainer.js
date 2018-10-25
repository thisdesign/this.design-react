import React from 'react';
// import throttle from 'lodash.throttle';
import ScrollContext from './ScrollContext/ScrollContext';

export default class ScrollContainer extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  scrollToTop = (speed) => {
    const scrolling = setInterval(() => {
      const { scrollTop } = this.container.current;
      this.container.current.scrollTop -= speed;
      if (scrollTop === 0) {
        clearInterval(scrolling);
      }
    }, 1000 / 60);
  }

  render() {
    const { children, className } = this.props;
    return (
      <div className={className} ref={this.container}>
        <ScrollContext.Provider value={{
           container: this.container,
           onScroll: this.onScroll,
           removeListener: this.removeListener,
           scrollToTop: this.scrollToTop,
         }}
        >
          {children}
        </ScrollContext.Provider>
      </div>);
  }
}
