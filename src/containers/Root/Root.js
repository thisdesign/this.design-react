import React from 'react';
import Homepage from 'containers/Homepage/Homepage';
import CaseStudyQueue from 'containers/CaseStudyQueue/CaseStudyQueue';
import Loading from 'components/Loading/Loading';


const Root = ({
  siteInfo, notFound, currentCaseStudy, caseStudies, isHome, loading,
}) => {
  if (isHome) {
    return <Homepage data={siteInfo} notFound={notFound} />;
  }
  return (
    <React.Fragment>
      { loading && <Loading />}
      <CaseStudyQueue
        caseStudies={caseStudies}
        currentCaseStudy={currentCaseStudy}
        changeProj={this.changeProj}
      />
    </React.Fragment>
  );
};

export default Root;
