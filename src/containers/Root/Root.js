import React from 'react';
import Homepage from 'containers/Homepage/Homepage';
import { withRouter } from 'react-router-dom';
import Loading from 'components/Loading/Loading';
import CaseStudyQueue from 'containers/CaseStudyQueue/CaseStudyQueue';
import PropTypes from 'prop-types';

class Root extends React.Component {
  handleOpen = () => {
    setTimeout(() => {
      this.props.history.push('/work/lora');
    }, 600);
  }

  render() {
    const { isHome, projectLaunchStatus } = this.props;
    return (
      <React.Fragment>
        {isHome &&
          <Homepage shim handleOpen={this.handleOpen} />
        }
        <React.Fragment>
          {projectLaunchStatus !== 'ready' && <Loading />}
          {projectLaunchStatus !== 'transitioning' && <CaseStudyQueue />}
        </React.Fragment>
      </React.Fragment>
    );
  }
}

Root.propTypes = {
  isHome: PropTypes.bool.isRequired,
  projectLaunchStatus: PropTypes.string.isRequired,
};
export default withRouter(Root);
