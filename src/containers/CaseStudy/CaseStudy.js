import React from 'react';
import uuidv1 from 'uuid/v1';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';
import CaseStudyCover from '../../components/CaseStudyCover/CaseStudyCover';

import Text from './slices/Text/Text';
import Gallery from './slices/Gallery/Gallery';
import Columns from './slices/Columns/Columns';
import Image from './slices/Image/Image';
import Video from './slices/Video/Video';
import Pullquote from './slices/Pullquote/Pullquote';
import Website from './slices/Website/Website';
import Diptych from './slices/Diptych/Diptych';

import './CaseStudy.css';

/**
 * Still some work to be done with regards to
 * the efficency of this. Will try to keep it
 * simple now
 */

export default class CaseStudy extends React.Component {
  state = {
    doc: null,
    notFound: false,
  };

  componentWillMount() {
    this.getCaseStudyDoc(this.props);
  }

  /**
   * Keeping rerenders under control. If this is
   * causing problems, return `true` to check
   */

  shouldComponentUpdate = (nextProps, nextState) => {
    const newRoute = this.props.route !== nextProps.route;
    const newAnimState = this.props.isAnimatingToCs !== nextProps.isAnimatingToCs;
    const newDoc = nextState.doc !== this.state.doc;
    return newRoute || newAnimState || newDoc;
  }

  /**
   * Reset state based on props change
   */

  componentDidUpdate(prevProps) {
    const recievedNewRoute = prevProps.route !== this.props.route;
    if (recievedNewRoute) {
      this.getCaseStudyDoc();
    }
  }

  /**
   * Set isAnimatingToCs based on props
   */

  getCaseStudyDoc = () => {
    this.props.prismicCtx.api.getByUID('casestudy', this.props.route).then((doc) => {
      if (doc) {
        this.setState({ doc });
      } else {
        this.setState({ notFound: true });
      }
    });
  }

  render() {
    const { doc, notFound } = this.state;
    if (doc && !this.props.isAnimatingToCs) {
      const title = `${doc.data.title} – This Design – Portland, OR`;

      const customCmsAtts = {
        color: doc.data.text_color,
        backgroundColor: doc.data.background_color,
      };

      const slices = doc.data.content.map((slice) => {
        switch (slice.slice_type) {
          case 'text':
            return <Text data={slice} />;
          case 'columns':
            return <Columns data={slice} title={title} />;
          case 'columns-v2':
            return <Columns data={slice} title={title} />;
          case 'image':
            return <Image data={slice.value[0]} title={title} />;
          case 'image-v2':
            return <Image data={slice.primary} title={title} />;
          case 'diptych':
            return <Diptych data={slice} title={title} />;
          case 'diptych-v2':
            return <Diptych data={slice} title={title} />;
          case 'video':
            return <Video data={slice} />;
          case 'gallery':
            return <Gallery data={slice} title={title} />;
          case 'gallery-v2':
            return <Gallery data={slice} title={title} />;
          case 'pullquote':
            return <Pullquote data={slice} />;
          case 'website':
            return <Website data={slice} title={title} />;
          default:
            return <p className="future">{slice.slice_type} goes here</p>;
        }
      });

      return (
        <article className="casestudy" style={customCmsAtts}>
          <div className="view__child">
            <CaseStudyCover data={doc.data} />
            <div className="casestudy__body">
              {slices.map(slice => <div className="casestudy__block" key={uuidv1()}>{slice}</div>)}
            </div>
          </div>
        </article>
      );
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
