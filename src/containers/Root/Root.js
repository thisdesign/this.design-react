import React from 'react';
import Homepage from 'containers/Homepage/Homepage';
import { withRouter } from 'react-router-dom';
import Loading from 'components/Loading/Loading';
import CaseStudyQueue from 'containers/CaseStudyQueue/CaseStudyQueue';
import PropTypes from 'prop-types';

class HomepageWithNext extends React.Component {
  handleOpen = () => {
    setTimeout(() => {
      this.props.history.push('/work/lora');
    }, 600);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.isHome &&
          <React.Fragment>
            <div
              style={{ background: 'red', position: 'fixed', zIndex: 500 }}
              onClick={this.handleOpen}
            >NEXT
            </div>
            <Homepage />
          </React.Fragment>}
        <CaseStudyQueue />;
      </React.Fragment>
    );
  }
}

const HomepageWithNextWithRouter = withRouter(HomepageWithNext);

const Root = ({ isHome, projectLaunchStatus }) =>
  (
    <React.Fragment>
      {projectLaunchStatus !== 'ready' && <Loading />}
      {projectLaunchStatus !== 'transitioning' && <HomepageWithNextWithRouter isHome={isHome} />}
    </React.Fragment>
  );
Root.propTypes = {
  isHome: PropTypes.bool.isRequired,
  projectLaunchStatus: PropTypes.string.isRequired,
};
export default React.memo(Root);
