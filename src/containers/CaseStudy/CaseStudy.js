import React from 'react';
import NavChanger from './_NavChanger';
import Shim from './_Shim';
import CaseStudyCover from '../../components/CaseStudyCover/CaseStudyCover';
import Slices from './slices/Slices';
import './CaseStudy.scss';

const caseStudy = ({
  doc, next, advanceQueue, isAnimating, isHome, handleOpen,
}) => {
  const title = `${doc.data.title} – This Design – Portland, OR`;

  const customCmsAtts = {
    color: doc.data.text_color,
    backgroundColor: doc.data.background_color,
  };

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
        {(!next && !isHome) && (
          <>
            <NavChanger />
            <Slices sliceData={doc.data.content} title={title} />
          </>
        )}
      </div>
      <Shim advanceQueue={advanceQueue} isHome={isHome} />
    </article>
  );
};


export default React.memo(caseStudy);
