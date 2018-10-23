import React from 'react';
import throttle from 'lodash.throttle';
import ScrollContext from './ScrollContext/ScrollContext';


export default class ScrollContainer extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  state = {
    scrollTop: 0,
  }

  componentDidMount() {
    this.container.current.addEventListener('scroll', throttle(this.logPosition, 60 / 1000));
    this.getContainer();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.viewName === nextProps.view || this.props.viewName === this.props.view;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.view !== this.props.view && this.props.view === 'root') {
      this.container.current.scrollTop = 0;
    }
  }

  getContainer = () => this.container

  scrollToTop = (speed) => {
    const scrolling = setInterval(() => {
      const { scrollTop } = this.container.current;
      this.container.current.scrollTop -= speed;
      if (scrollTop === 0) {
        clearInterval(scrolling);
      }
    }, 1000 / 60);
  }

  logPosition = () => {
    this.setState({ scrollTop: this.container.current.scrollTop });
  }

  render() {
    const { children, className } = this.props;
    return (
      <div className={className} ref={this.container}>
        <ScrollContext.Provider value={{
            scrollTop: this.state.scrollTop,
            scrollToTop: this.scrollToTop,
            getContainer: this.getContainer,
          }}
        >
          {children}
        </ScrollContext.Provider>
      </div>
    );
  }
}
