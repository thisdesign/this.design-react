import React from 'react';
import uuidv1 from 'uuid/v1';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';
import Text from './slices/Text/Text';
import Columns from './slices/Columns/Columns';
import Instagram from './slices/Instagram/Instagram';
import Gridwall from './slices/Gridwall/Gridwall';

import './About.css';

export default class About extends React.Component {
  state = {
    doc: null,
    notFound: false,
  };

  componentDidMount() {
    this.getAboutDoc();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  getAboutDoc = () => {
    this.props.prismicCtx.api.getByUID('about', 'about').then((doc) => {
      if (doc) {
        this.setState({ doc });
      } else {
        this.setState({ notFound: true });
      }
    });
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
          case 'instagram':
            return <Instagram data={slice} />;
          case 'gridwall-v2':
            return <Gridwall data={slice} />;
          default:
            return <p className="future">{slice.slice_type} goes here</p>;
        }
      });

      return (
        <div className="about__inner view__child">
          {slices.map(slice => <div className="about__block" key={uuidv1()}>{slice}</div>)}
        </div>
      );
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
