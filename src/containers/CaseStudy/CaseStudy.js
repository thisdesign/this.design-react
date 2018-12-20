import React from 'react';
import { RichText } from 'prismic-reactjs';
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

  const customCmsAtts = {
    color: doc.data.text_color,
    backgroundColor: doc.data.background_color,
  };

  const slices = doc.data.content.map((data) => {
    const atts = { data, title };
    switch (data.slice_type) {
      case 'text':
        return <Text value={RichText.render(data.value)} type="text" />;
      case 'columns':
      case 'columns-v2':
        return <Columns {...atts} type="columns" />;
      case 'image':
      case 'image-v2':
        return <Image {...atts} type="image" />;
      case 'diptych':
      case 'diptych-v2':
        return <Diptych {...atts} type="diptych" />;
      case 'video':
        return <Video {...atts} type="video" />;
      case 'gallery':
      case 'gallery-v2':
        return <Gallery {...atts} type="gallery" />;
      case 'pullquote':
        return <Pullquote {...atts} type="pullquote" />;
      case 'website':
        return <Website {...atts} type="website" />;
      default:
        console.error('nothing built for', data.slice_type); //eslint-disable-line
        return null;
    }
  });

  const Slice = ({ children, type }) => (
    <div className={`casestudy__block casestudy__block--${type}`} >
      {children}
    </div>
  );

  const Slices = () =>
    slices.map((slice, i) => (
      <Slice type={slice.props.type} key={slice.props.type + i}>
        {slice}
      </Slice>
    ));

  const Shim = () => (
    <CursorAnchor detached textId="launch" >
      <div className="casestudy__shim" onClick={advanceQueue} />
    </CursorAnchor>
  );

  const articleClasses = [
    'casestudy',
    next ? 'casestudy--next' : '',
    isAnimating ? '-isAnimating' : '',
  ].join(' ');

  return (
    <article className={articleClasses} >
      <div className="casestudy__body" style={customCmsAtts}>
        <CaseStudyCover data={doc.data} />
        <Slices />
      </div>
      <Shim />
    </article>

  );
};

export default React.memo(caseStudy);
