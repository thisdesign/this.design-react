import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CaseStudy from 'containers/CaseStudy/CaseStudy';
import { withRouter } from 'react-router-dom';
import LayoutContext from 'containers/Layout/LayoutContext';

class CaseStudyQueue extends Component {
  state = {
    isAnimating: false,
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
    const {
      caseStudies, currentIndex, nextIndex, unselected,
    } = this.context.csData;

    const csTrack = unselected ? [0, null] : [currentIndex, nextIndex];

    return (
      csTrack.map((arrayContents, i) => (
        arrayContents !== null &&
        <CaseStudy
          key={arrayContents}
          next={i === 1}
          advanceQueue={this.advanceQueue}
          doc={caseStudies[arrayContents]}
          isAnimating={this.state.isAnimating || this.props.openingFromHome}
          isHome={this.props.isHome}
          handleOpen={this.props.handleOpen}
        />
      )));
  }
}

CaseStudyQueue.propTypes = {
  history: PropTypes.object, //eslint-disable-line
  openingFromHome: PropTypes.bool.isRequired,
  isHome: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

const CaseStudyQueueWithRouter = withRouter(CaseStudyQueue);
CaseStudyQueueWithRouter.WrappedComponent.contextType = LayoutContext;
export default CaseStudyQueueWithRouter;
