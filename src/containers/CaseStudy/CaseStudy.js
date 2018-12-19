import React from 'react';
import CursorAnchor from 'components/CursorDot/CursorAnchor';
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

const caseStudy = ({
  doc, next, advanceQueue, isAnimating,
}) => {
  const title = `${doc.data.title} – This Design – Portland, OR`;
  const isNext = next === true;

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

  const articleClasses = [
    'casestudy',
    isNext ? 'casestudy--next' : '',
    isAnimating ? '-isAnimating' : '',
  ].join(' ');

  return (
    <article className={articleClasses} >
      <div className="casestudy__body" style={customCmsAtts}>
        <CaseStudyCover data={doc.data} />
        {
          slices.map((slice, i) => {
            const type = slice.props.data && slice.props.data.slice_type.replace('-v2', '');
            const className = `casestudy__block casestudy__block--${type}`;
            return (
              /*
               the following <div />
               used to be <ScrollTrigger /> which
               faded in each module when it's 100px in view
              */
              <div
                offset={100}
                className={className}
                key={i} // eslint-disable-line
              >
                {slice}
              </div>);
          })
        }
      </div>
      <CursorAnchor detached textId="launch" >
        <div className="casestudy__shim" onClick={advanceQueue} />
      </CursorAnchor>
    </article>

  );
};

export default React.memo(caseStudy);
