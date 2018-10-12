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

  componentWillMount() {
    console.log('About will mount');
    this.getAboutDoc(this.props);
  }

  componentWillReceiveProps(props) {
    console.log('About will receive props');
    console.log('props ', props);
    this.getAboutDoc(props);
  }

  componentDidUpdate() {
    console.log('About did update');
    this.props.prismicCtx.toolbar();
  }

  getAboutDoc = () => {
    const { prismicCtx } = this.props;
    if (prismicCtx !== null) {
      prismicCtx.api.getByUID('about', 'about').then((doc) => {
        if (doc) {
          console.log('doc ', doc);
          this.setState({ doc, notFound: true });
        } else {
          console.log('notfound about doc ');
          this.setState({ notFound: true });
        }
      });
    } else {
      this.setState({ notFound: true });
    }
  };

  render() {
    const { doc, notFound } = this.state;
    const { view } = this.props;

    if (doc) {
      const slices = doc.data.content.map((slice) => {
        switch (slice.slice_type) {
          case 'text':
            return <Text data={slice} />;
          case 'columns':
            return <Columns data={slice} />;
          case 'instagram':
            return <Instagram data={slice} view={view} />;
          case 'gridwall-v2':
            return <Gridwall data={slice} />;
          default:
            return <p className="future">{slice.slice_type} goes here</p>;
        }
      });

      return (
        <section className="view about view--aside">
          <div className="about__inner view__child">
            <h1>about with slices</h1>
            {slices.map(slice => (
              <div className="about__block" key={uuidv1()}>
                {slice}
              </div>
            ))}
          </div>
        </section>
      );
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
