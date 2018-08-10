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
import Diptych from './slices/Diptych/Diptych';

import getByUID from '../../util/getByUID';

import './CaseStudy.css';


export default class CaseStudy extends React.Component {
  state = {
    doc: null,
    notFound: false,
  };

  componentWillMount() {
    this.getCaseStudyDoc(this.props);
  }

  componentWillReceiveProps(props) {
    this.getCaseStudyDoc(props);
  }

  componentDidUpdate() {
    this.props.prismicCtx.toolbar();
  }

  getCaseStudyDoc = (props = this.props) => {
    getByUID({
      props,
      component: this,
      pageType: 'casestudy',
      uid: props.route,
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
          case 'image':
            return <Image data={slice} />;
          case 'diptych':
            return <Diptych data={slice} />;
          case 'video':
            return <Video data={slice} />;
          case 'gallery':
            return <Gallery data={slice} />;
          case 'pullquote':
            return <Pullquote data={slice} />;
          default:
            return <p className="future">{slice.slice_type} goes here</p>;
        }
      });

      return (
        <article className="casestudy">
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
