import React, { Component } from 'react';
import CaseStudy from 'containers/CaseStudy/CaseStudy';
import { withRouter } from 'react-router-dom';
import LayoutContext from 'containers/Layout/LayoutContext';

class CaseStudyQueue extends Component {
  state = {
    visibleProjects: [],
    isAnimating: false,
  }

  componentWillMount() {
    this._switchQueue();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this._switchQueue();
    }
  }

  _switchQueue = () => {
    const {
      unselected, currentIndex, caseStudies, nextIndex,
    } = this.context.csData;

    this.setState({
      visibleProjects: unselected
        ? [caseStudies[0], null] // if home
        : [caseStudies[currentIndex], caseStudies[nextIndex]], // otherwise
    });
  }

  _updateUrl = (uid) => { this.props.history.push(uid); }

  _startAnimation = () => this.setState({ isAnimating: true })

  _stopAnimation = () => this.setState({ isAnimating: false })

  _handleTransitionEnd = () => {
    this._updateUrl(`/work/${this.context.csData.nextUid}`);
    this._stopAnimation();
  }

  advanceQueue = () => {
    this._startAnimation();
    setTimeout(() => { this._handleTransitionEnd(); }, 600);
  }

  render() {
    const { isAnimating, visibleProjects } = this.state;
    const { openingFromHome } = this.props;

    return (
      this.state.visibleProjects.map((cs, i) => (
        cs &&
        <CaseStudy
          key={cs.id}
          next={i === 1}
          advanceQueue={this.advanceQueue}
          doc={visibleProjects[i]}
          isAnimating={isAnimating || openingFromHome}
          isHome={this.props.isHome}
          handleOpen={this.props.handleOpen}
        />
      )));
  }
}

const CaseStudyQueueWithRouter = withRouter(CaseStudyQueue);
CaseStudyQueueWithRouter.WrappedComponent.contextType = LayoutContext;
export default CaseStudyQueueWithRouter;
