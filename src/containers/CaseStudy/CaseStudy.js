import React from 'react';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';
import Text from './slices/Text/Text';
import Columns from './slices/Columns/Columns';
import Image from './slices/Image/Image';

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
            return <Text data={slice} />;
          case 'columns':
            return <Columns data={slice} />;
          case 'image':
            return <Image data={slice} />;
          default:
            console.error('Could not find slice type', slice.slice_type); // eslint-disable-line no-console
        }
        return <p className="future">{slice.slice_type} goes here</p>;
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
