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
    this._switchQueue();
    this._handle404();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this._switchQueue();
    }
  }

  _getCurrentIndex = () => (
    this.context.caseStudies
      .map(cs => cs.uid)
      .indexOf(this.context.currentCaseStudy))

  _getNextIndex = () => (this._isLastCaseStudy() ? 0 : this._getNextIndex());

  _getNextUid = () => this.context.caseStudies[this._getNextIndex()].uid

  _getNextIndex = () => this._getCurrentIndex() + 1

  _isLastCaseStudy = () => this._getNextIndex() === this.context.caseStudies.length

  _isNotFound = () => this._getCurrentIndex() === -1 || this._getNextIndex() === -1

  _handle404 = () => {
    this.context.handleNotFound(this._isNotFound());
  }

  _switchQueue = () => {
    this.setState({
      visibleProjects: [
        this.context.caseStudies[!this._isNotFound() ? this._getCurrentIndex() : 0],
        this.context.caseStudies[!this._isNotFound() ? this._getNextIndex() : null],
      ],
    });
  }

  _updateUrl = (uid) => { this.props.history.push(uid); }

  _disableNotFound = () => this.context.handleNotFound(false)

  _startAnimation = () => this.setState({ isAnimating: true })

  _stopAnimation = () => this.setState({ isAnimating: false })

  _handleTransitionEnd = () => {
    this._updateUrl(`/work/${this._getNextUid()}`);
    this._disableNotFound();
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
