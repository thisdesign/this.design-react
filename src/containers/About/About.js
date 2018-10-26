import React from 'react';
import uuidv1 from 'uuid/v1';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';
import Text from './slices/Text/Text';
import ScrollTrigger from '../ScrollTrigger/ScrollTrigger';
import Columns from './slices/Columns/Columns';
import Instagram from './slices/Instagram/Instagram';
import Conclusion from './slices/Conclusion/Conclusion';
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
    if (!this.state.notFound) {
      const { doc } = this.state;
      const slices = doc ? (
        doc.data.content
          // map 'slice_type' to component
          .map((slice) => {
            switch (slice.slice_type) {
              case 'text':
                return <Text data={slice} />;
              case 'columns':
                return <Columns data={slice} />;
              case 'instagram':
                return <Instagram data={slice} />;
              case 'gridwall-v2':
                return <Gridwall data={slice} />;
              case 'conclusion':
                return <Conclusion data={slice} />;
              case 'color-start':
                return <ScrollTrigger />;
              default:
                return <p className="future">{slice.slice_type} goes here</p>;
            }
          })
          // map to wrapping div
          .map(slice => (
            <div className="about__block" key={uuidv1()}>
              {slice}
            </div>))
      ) : null;

      return (
        <div className="about__inner view__child">
          { slices || <Loading />}
        </div>
      );
    }
    return <NotFound />;
  }
}
