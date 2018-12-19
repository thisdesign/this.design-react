import React, { Component } from 'react';
import CaseStudy from 'containers/CaseStudy/CaseStudy';
import { withRouter } from 'react-router-dom';
import LayoutContext from 'containers/Layout/LayoutContext';

class CaseStudyQueue extends Component {
  static contextType = LayoutContext;

  state = {
    visibleProjects: [],
    isAnimating: false,
  }

  componentWillMount() {
    this.switchQueue();
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
    const totalCaseStudies = this.context.caseStudies.length;
    const index = this.getCurrentIndex();
    const isLastCaseStudy = (index + 1) === totalCaseStudies;
    return (!isLastCaseStudy) ? index + 1 : 0;
  };

  getNextUid = () => this.context.caseStudies[this.getNextIndex()].uid

  switchQueue = () => {
    this.setState({
      visibleProjects: [
        this.context.caseStudies[this.getCurrentIndex()],
        this.context.caseStudies[this.getNextIndex()],
      ],
    });
  }

  updateUrl = (uid) => {
    this.props.history.push(uid);
  }

  changeCaseStudy = () => {
    this.props.history.push(`/work/${this.getNextUid()}`);
    this.updateUrl(this.context.currentCaseStudy);
    this.setState({ isAnimating: false });
  }

  advanceQueue = () => {
    this.setState({ isAnimating: true });

    setTimeout(() => {
      this.changeCaseStudy();
    }, 600);
  }

  render() {
    const { isAnimating, visibleProjects } = this.state;
    return (
      this.state.visibleProjects.map((cs, i) => {
        if (i === 0) {
          return (
            <CaseStudy
              key={cs.id}
              advanceQueue={this.advanceQueue}
              doc={visibleProjects[0]}
              isAnimating={isAnimating}
            />
          );
        }
        if (i === 1) {
          return (
            <CaseStudy
              next
              key={cs.id}
              isAnimating={isAnimating}
              doc={visibleProjects[1]}
            />
          );
        }
        return null;
      }));
  }
}

export default withRouter(CaseStudyQueue);
