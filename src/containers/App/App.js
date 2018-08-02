import React from 'react';
import Loading from '../../components/Loading/Loading';
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
      return props.prismicCtx.api.getByUID('context', 'home').then((doc) => {
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
      const homepageLinks = doc.data.case_study_list.map((item) => {
        const { uid } = item.case_study_item;
        return <a className="homepageLink" href={`#${uid}`}>{item.case_study_item.uid}</a>;
      });
      return (
        <div>
          {homepageLinks}
          <CaseStudy prismicCtx={this.props.prismicCtx} />
        </div>
      );
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
