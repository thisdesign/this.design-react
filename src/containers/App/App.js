import React from 'react';
import Loading from '../../components/Loading/Loading';
import Work from '../../components/Work/Work';
import NotFound from '../../components/NotFound/NotFound';
import CaseStudy from '../CaseStudy/CaseStudy';

import '../../styles/reset.css';
import '../../styles/fonts.css';
import '../../styles/typography.css';
import '../../styles/main.css';

export default class App extends React.Component {
  state = {
    doc: null,
    notFound: false,
  };

  componentWillMount() {
    this.fetchPage(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchPage(props);
  }

  componentDidUpdate() {
    this.props.prismicCtx.toolbar();
  }

  fetchPage(props) {
    if (props.prismicCtx) {
      return props.prismicCtx.api.getByUID('context', 'home', {
        fetchLinks: [
          'casestudy.title',
          'casestudy.thumbnail',
        ],
      }).then((doc) => {
        if (doc) {
          this.setState({ doc });
        } else {
          this.fetchPage(props);
        }
      });
    }
    return null;
  }

  render() {
    const { doc, notFound } = this.state;
    if (doc) {
      return (
        <React.Fragment>
          <Work caseStudyList={doc.data.case_study_list} />
          <CaseStudy prismicCtx={this.props.prismicCtx} />
        </React.Fragment>
      );
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
