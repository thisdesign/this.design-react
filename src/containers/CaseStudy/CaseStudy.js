import React from 'react';
import CursorAnchor from 'components/CursorDot/CursorAnchor';
import CaseStudyCover from '../../components/CaseStudyCover/CaseStudyCover';
import Slices from './slices/Slices';
import './CaseStudy.css';

const caseStudy = ({
  doc, next, advanceQueue, isAnimating, isHome, handleOpen,
}) => {
  const title = `${doc.data.title} – This Design – Portland, OR`;

  const customCmsAtts = {
    color: doc.data.text_color,
    backgroundColor: doc.data.background_color,
  };

  const Shim = () => (
    <CursorAnchor detached textId="launch" >
      <div className="casestudy__shim" onClick={advanceQueue} />
    </CursorAnchor>
  );

  const articleClasses = [
    'casestudy',
    next ? 'casestudy--next' : '',
    isAnimating ? '-isAnimating' : '',
    isHome ? '-isHome' : '',
  ].join(' ');

  return (
    <article className={articleClasses} onClick={isHome ? handleOpen : null}>
      <div className="casestudy__body" style={customCmsAtts}>
        <CaseStudyCover data={doc.data} />
        {(!next && !isHome) && <Slices sliceData={doc.data.content} title={title} />}
      </div>
      <Shim />
    </article>

  );
};

export default React.memo(caseStudy);
