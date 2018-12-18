import React, { Component } from 'react';
import CaseStudy from 'containers/CaseStudy/CaseStudy';
import { withRouter } from 'react-router-dom';

class CaseStudyQueue extends Component {
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
    const { caseStudies, currentCaseStudy } = this.props;
    return caseStudies.map(cs => cs.uid).indexOf(currentCaseStudy);
  }

  getNextIndex = () => {
    const totalCaseStudies = this.props.caseStudies.length;
    const index = this.getCurrentIndex();
    const isLastCaseStudy = (index + 1) === totalCaseStudies;
    return (!isLastCaseStudy) ? index + 1 : 0;
  };

  getNextUid = () => this.props.caseStudies[this.getNextIndex()].uid

  switchQueue = () => {
    this.setState({
      visibleProjects: [
        this.props.caseStudies[this.getCurrentIndex()],
        this.props.caseStudies[this.getNextIndex()],
      ],
    });
  }

  updateUrl = (uid) => {
    this.props.history.push(uid);
  }

  changeCaseStudy = () => {
    this.props.history.push(`/work/${this.getNextUid()}`);
    this.updateUrl(this.props.currentCaseStudy);
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
