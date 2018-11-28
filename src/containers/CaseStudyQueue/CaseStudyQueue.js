import React, { Component } from 'react';
import CaseStudy from 'containers/CaseStudy/CaseStudy';
import { withRouter } from 'react-router-dom';

class CaseStudyQueue extends Component {
  state = {
    visibleProjects: [],
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
    const nextIndex = (!isLastCaseStudy) ? index + 1 : 0;
    return nextIndex;
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

  advanceQueue = () => {
    this.props.changeProj(this.getNextUid());
    this.updateUrl(this.getNextUid());
    document.querySelector('.view.root').scrollTo(0, 0); // CHANGE
  }

  render() {
    return (
      this.state.visibleProjects.map((cs, i) => {
        if (i === 0) {
          return (
            <CaseStudy key={cs.id} doc={this.state.visibleProjects[0]} />
          );
        }
        if (i === 1) {
          return (
            <CaseStudy
              next
              key={cs.id}
              advanceQueue={this.advanceQueue}
              doc={this.state.visibleProjects[1]}
            />
          );
        }
        return null;
      }));
  }
}

export default withRouter(CaseStudyQueue);
