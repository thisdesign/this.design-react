import React from 'react';
import uuidv1 from 'uuid/v1';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';
import CaseStudyCover from '../../components/CaseStudyCover/CaseStudyCover';

import Text from './slices/Text/Text';
import Columns from './slices/Columns/Columns';
import Image from './slices/Image/Image';
import Video from './slices/Video/Video';
import Diptych from './slices/Diptych/Diptych';

import './CaseStudy.css';


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
          case 'diptych':
            return <Diptych data={slice} />;
          case 'video':
            return <Video data={slice} />;
          default:
            return <p className="future">{slice.slice_type} goes here</p>;
        }
      });

      return (
        <article className="casestudy">
          <CaseStudyCover data={doc.data} />
          <div className="casestudy__body">
            {slices.map(slice => <div className="casestudy__block" key={uuidv1()}>{slice}</div>)}
          </div>
        </article>
      );
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
