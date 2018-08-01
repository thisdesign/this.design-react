import React from 'react';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';
import CaseStudy from '../CaseStudy/CaseStudy';

// import '../../styles/reset.css';
import '../../styles/typography.css';

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
      return props.prismicCtx.api.getByUID('home', 'home').then((doc) => {
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
        <div>
          {doc.data.description}
          <CaseStudy prismicCtx={this.props.prismicCtx} />
        </div>
      );
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
