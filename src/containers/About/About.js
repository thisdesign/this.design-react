import React from 'react';
import uuidv1 from 'uuid/v1';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';
import Text from './slices/Text/Text';
import Columns from './slices/Columns/Columns';

import getByUID from '../../util/getByUID';

import './About.css';

export default class CaseStudy extends React.Component {
  state = {
    doc: null,
    notFound: false,
  };

  componentWillMount() {
    this.getAboutDoc(this.props);
  }

  componentWillReceiveProps(props) {
    this.getAboutDoc(props);
  }

  componentDidUpdate() {
    this.props.prismicCtx.toolbar();
  }

  getAboutDoc = (props = this.props) => {
    getByUID({
      props,
      component: this,
      pageType: 'about',
      uid: 'about',
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
