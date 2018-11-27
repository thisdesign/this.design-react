import React, { Component } from 'react';
import CaseStudy from 'containers/CaseStudy/CaseStudy';
import { withRouter } from 'react-router-dom';

class CaseStudyQueue extends Component {
  state = {
    visibleProjects: [],
  }

  componentWillMount() {
    this.switchQueue();
    // this.props.history.push('fucfk!!!');
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

  advanceQueue = () => {
    this.props.changeProj(this.getNextUid());
    document.querySelectorAll('.view__inner')[1].scrollTo(0, 0); // CHANGE
  }

  render() {
    return (
      this.state.visibleProjects.map((cs, i) => {
        if (i === 0) {
          return (
            <div key={cs.id}>
              <CaseStudy doc={this.state.visibleProjects[0]} />
            </div>);
        }
        if (i === 1) {
          return (
            <div key={cs.id} onClick={this.advanceQueue} className="peek">
              <CaseStudy doc={this.state.visibleProjects[1]} x />
            </div>);
        }
        return null;
      }));
  }
}

export default withRouter(CaseStudyQueue);


//
// goToNext = () => {
//   window.window.scrollY = 0;
//   this.setState({ currentCaseStudy: 'soma' });
// }
//
//
// changeIndex = () => {
//   document.querySelectorAll('.view__inner')[1].scrollTo(0, 0);
//   this.setState({ index: this.state.index + 1 });
// }


// getProjectByIndex(i) {
//   return this.state.caseStudies[i];
// }
// getNextProjectByUid = (uid) => {
//   const index = this.state.caseStudies.map(cs => cs.uid).indexOf(uid);
//   return (index !== -1 ? this.state.caseStudies[index + 1] : null);
// }


//
// getProjectByUid = (uid) => {
//   const index = this.state.caseStudies.map(cs => cs.uid).indexOf(uid);
//   return (index !== -1 ? this.state.caseStudies[index] : null);
// }
