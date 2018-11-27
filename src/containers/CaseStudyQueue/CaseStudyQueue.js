import React, { Component } from 'react';
import CaseStudy from 'containers/CaseStudy/CaseStudy';

class CaseStudyQueue extends Component {
  state = {
    visibleProjects: [
      this.props.caseStudies[0],
      this.props.caseStudies[1]],
  }
  componentWillMount() {
    const { caseStudies } = this.props;
  }
  componentDidMount() {
  }

  getIndexFromProj = () => {
    const { caseStudies, currentCaseStudy } = this.props;
    return caseStudies.map(cs => cs.uid).indexOf(currentCaseStudy);
  }

  getNextIndex = () => this.getIndexFromProj() + 1;

  getNextUid = () => this.props.caseStudies[this.getNextIndex()].uid

  advanceQueue = () => {
    // this.props.changeProj(this.getNextUid());
    document.querySelectorAll('.view__inner')[1].scrollTo(0, 0);

    const { caseStudies } = this.props;
    this.setState({ visibleProjects: [caseStudies[1], caseStudies[2]] });
  }

  render() {
    const { caseStudies } = this.props;
    const index = this.getIndexFromProj();
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

export default CaseStudyQueue;


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
