import React from 'react';
import { RichText } from 'prismic-reactjs';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';

export default class CaseStudy extends React.Component {
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
    const { hash } = window.location;
    if (hash) {
      const uid = hash.substring(1);
      if (props.prismicCtx) {
        return props.prismicCtx.api.getByUID('casestudy', uid).then((doc) => {
          if (doc) {
            this.setState({ doc });
          } else {
            this.setState({ notFound: !doc });
          }
        });
      }
      return null;
    }
    return null;
  }

  render() {
    const { doc, notFound } = this.state;

    if (doc) {
      const slices = doc.data.content.map((slice) => {
        switch (slice.slice_type) {
          case 'text':
            return <p>{ RichText.asText(slice.value)}</p>;
          case 'columns':
            return <div>{RichText.asText(slice.value[0].text)}</div>;
          case 'image':
            return <img src={slice.value[0].file.url} width="100%" />;
          default:
            console.error('Could not find slice type', slice.slice_type); // eslint-disable-line no-console
        }
        return <pre>{slice.slice_type} goes here</pre>;
      });
      return (
        <div>
          <h1>{doc.data.title}</h1>
          <h3>{doc.data.description}</h3>
          <div>{slices}</div>
        </div>
      );
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
