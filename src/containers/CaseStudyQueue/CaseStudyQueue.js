import React, { Component } from 'react';
import CaseStudy from 'containers/CaseStudy/CaseStudy';
import { withRouter } from 'react-router-dom';
import LayoutContext from 'containers/Layout/LayoutContext';

class CaseStudyQueue extends Component {
  // static contextType = LayoutContext;

  state = {
    visibleProjects: [],
    isAnimating: false,
  }

  componentWillMount() {
    this.switchQueue();
    this.check404();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.switchQueue();
    }
  }

  getCurrentIndex = () => {
    const { caseStudies, currentCaseStudy } = this.context;
    return caseStudies.map(cs => cs.uid).indexOf(currentCaseStudy);
  }

  getNextIndex = () => {
    const nextIndex = this.getCurrentIndex() + 1;
    return (nextIndex === this.context.caseStudies.length) // if last
      ? 0
      : nextIndex;
  };

  getNextUid = () => this.context.caseStudies[this.getNextIndex()].uid

  check404 = () => {
    this.context.handleNotFound(this.notFound());
  }

  notFound = () =>
    this.getCurrentIndex() === -1 ||
    this.getNextIndex() === -1

  switchQueue = () => {
    const found = !this.notFound();
    this.setState({
      visibleProjects: [
        this.context.caseStudies[found ? this.getCurrentIndex() : 0],
        this.context.caseStudies[found ? this.getNextIndex() : null],
      ],
    });
  }

  updateUrl = (uid) => { this.props.history.push(uid); }

  disableNotFound = () => this.context.handleNotFound(false)

  stopAnimation = () => this.setState({ isAnimating: false })

  changeCaseStudy = () => {
    this.updateUrl(`/work/${this.getNextUid()}`);
    this.disableNotFound();
    this.stopAnimation();
  }

  advanceQueue = () => {
    this.setState({ isAnimating: true });

    setTimeout(() => {
      this.changeCaseStudy();
    }, 600);
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
