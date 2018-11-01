import React from 'react';
import uuidv1 from 'uuid/v1';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';
import CaseStudyCover from '../../components/CaseStudyCover/CaseStudyCover';
import ScrollTrigger from '../ScrollTrigger/ScrollTrigger';
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
    const { isAnimatingToCs, route } = this.props;
    if (doc && doc.uid === route) {
      const title = `${doc.data.title} – This Design – Portland, OR`;

      const customCmsAtts = {
        color: doc.data.text_color,
        backgroundColor: doc.data.background_color,
      };

      const slices = doc.data.content.map((data) => {
        const atts = { data, title };
        switch (data.slice_type) {
          case 'text':
            return <Text {...atts} />;
          case 'columns':
            return <Columns {...atts} />;
          case 'columns-v2':
            return <Columns {...atts} />;
          case 'image':
            return <Image {...atts} />;
          case 'image-v2':
            return <Image {...atts} />;
          case 'diptych':
            return <Diptych {...atts} />;
          case 'diptych-v2':
            return <Diptych {...atts} />;
          case 'video':
            return <Video {...atts} />;
          case 'gallery':
            return <Gallery {...atts} />;
          case 'gallery-v2':
            return <Gallery {...atts} />;
          case 'pullquote':
            return <Pullquote {...atts} />;
          case 'website':
            return <Website {...atts} />;
          default:
            return <p className="future">{data.slice_type} goes here</p>;
        }
      });

      return (
        <article className="casestudy" style={customCmsAtts}>
          <div className="view__child">
            <CaseStudyCover data={doc.data} />
            <ScrollTrigger
              offset={0}
              onEnter={() => this.props.updateCsScrollPos(true)}
              onExit={() => this.props.updateCsScrollPos(false)}
            >
              <div className="casestudy__body">
                {!isAnimatingToCs && slices.map((slice) => {
                  const type = slice.props.data && slice.props.data.slice_type.replace('-v2', '');
                  const className = `casestudy__block casestudy__block--${type}`;
                  return (
                    <ScrollTrigger offset={100} className={className} key={uuidv1()}>
                      {slice}
                    </ScrollTrigger>
                );
              })}
              </div>
            </ScrollTrigger>
          </div>
        </article>
      );
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
