import React from 'react';
import Homepage from 'containers/Homepage/Homepage';
import { withRouter } from 'react-router-dom';
import Loading from 'components/Loading/Loading';
import CaseStudyQueue from 'containers/CaseStudyQueue/CaseStudyQueue';
import PropTypes from 'prop-types';
import LayoutContext from 'containers/Layout/LayoutContext';

class Root extends React.Component {
  static contextType = LayoutContext

  state = {
    isAnimating: false,
  }

  handleOpen = () => {
    this.setState({ isAnimating: true });

    setTimeout(() => {
      this.props.history.push(`/work/${this.context.caseStudies[0].uid}`);
      this.setState({ isAnimating: false });
    }, 600);
  }

  render() {
    const { isHome, projectLaunchStatus } = this.props;
    return (
      <React.Fragment>
        {isHome &&
          <Homepage
            shim
            openingFromHome={this.state.isAnimating}
          />
        }
        <React.Fragment>
          {projectLaunchStatus !== 'ready' && <Loading />}
          {projectLaunchStatus !== 'transitioning' &&
          <CaseStudyQueue
            openingFromHome={this.state.isAnimating}
            handleOpen={this.handleOpen}
            isHome={isHome}
          />}
        </React.Fragment>
      </React.Fragment>
    );
  }
}
Root.propTypes = {
  isHome: PropTypes.bool.isRequired,
  projectLaunchStatus: PropTypes.string.isRequired,
};

export default Object.assign(withRouter(Root), { contextType: undefined });
