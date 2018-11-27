import 'styles/reset.css';
import 'styles/fonts.css';
import 'styles/typography.css';
import 'styles/layout.css';

import React from 'react';
import PreviewRouter from 'containers/PrismicApp/PreviewRouter/PreviewRouter';
import Loading from 'components/Loading/Loading';
import Homepage from 'containers/Homepage/Homepage';
import Nav from 'components/Nav/Nav';
import Work from 'components/Work/Work';
import View from 'components/View/View';
import CaseStudyQueue from 'containers/CaseStudyQueue/CaseStudyQueue';
import About from 'containers/About/About';
import flatten from 'array-flatten';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.VIEW_CHANGE_DURATION = 600;
  }

  state = {
    siteInfo: null,
    notFound: false,
    currentCaseStudy: null,
    scrolledPastCsCover: null,
  };

  componentDidMount() {
    this.setCaseStudy();
  }

  componentDidUpdate(prevProps) {
    const hasLoadedCtx = prevProps.prismicCtx !== this.props.prismicCtx;
    const isNewUid = (this.props.uid !== prevProps.uid) && this.props.uid !== undefined;

    if (hasLoadedCtx) {
      this.loadSiteContext(this.props);
      this.loadSiteInfo(this.props);
      this.props.prismicCtx.toolbar();
    }
    if (isNewUid) { this.setCaseStudy(); }
  }

  setCaseStudy = () => {
    this.setState({ currentCaseStudy: this.props.uid });
  }

  setNotFound = () => {
    this.setState({ notFound: true });
  }

  getImages = doc => flatten(doc.results.map((item) => {
    const header = item.data.header[0];
    return [
      header.image1.url,
      header.image2.url,
      header.mobileImage.url,
    ];
  })).filter(el => el !== undefined)

  loadImages = (doc) => {
    const imgs = this.getImages(doc);
    const imgStatuses = [];
    imgs.forEach((url, i) => {
      imgStatuses[i] = new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve({ status: 'ok' });
        img.onerror = () => resolve({ status: 'error' });
      });
    });

    // Promise.all(imgStatuses).then(() => console.log('done'));
    return imgStatuses;
  }

  loadSiteContext = (props = this.props) => props.prismicCtx.api.getByUID('context', 'home').then((doc) => {
    if (doc) {
      const ids = doc.data.case_study_list.map(cs => cs.case_study_item.id);
      this.loadCaseStudies(ids);
    } else {
      this.setState({ notFound: true });
    }
  })


  loadCaseStudies = (ids) => {
    this.props.prismicCtx.api.getByIDs(ids).then((doc) => {
      this.setState({ caseStudies: doc.results });
      this.loadImages(doc);
    });
  }

  loadSiteInfo = (props) => {
    props.prismicCtx.api.getSingle('site').then((doc) => {
      if (doc) {
        this.setState({ siteInfo: doc });
      } else {
        this.setState({
          notFound: !doc,
        });
      }
    });
  }

  changeProj = (uid) => {
    this.setState({ currentCaseStudy: uid });
  }

  updateCsScrollPos = (scrolledPastCsCover) => {
    this.setState({ scrolledPastCsCover });
  }


  render() {
    const {
      siteInfo,
      currentCaseStudy,
      // isAnimatingToCs,
      scrolledPastCsCover,
      notFound,
      caseStudies,
    } = this.state;

    const { view } = this.props;

    if (siteInfo && caseStudies) {
      return (
        <React.Fragment>
          <Nav
            view={view}
            scrolledPastCsCover={scrolledPastCsCover}
            currentCaseStudy={currentCaseStudy}
          />
          <main className={`views -view-is-${view}`}>
            <View aside viewName="work" view={view}>
              <Work caseStudies={caseStudies} />
            </View>
            <View viewName="root" view={view}>
              {
                (!notFound && currentCaseStudy) ?
                  <CaseStudyQueue
                    caseStudies={caseStudies}
                    currentCaseStudy={currentCaseStudy}
                    changeProj={this.changeProj}
                  />
                 :
                  <Homepage data={siteInfo} notFound={notFound} />
              }
            </View>
            <View aside viewName="about" view={view} >
              <About prismicCtx={this.props.prismicCtx} />
            </View>
          </main>
        </React.Fragment>
      );
    }
    return (
      <PreviewRouter prismicCtx={this.props.prismicCtx}>
        <Loading />
      </PreviewRouter>);
  }
}

export default App;
