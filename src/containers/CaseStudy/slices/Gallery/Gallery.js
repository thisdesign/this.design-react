import React from 'react';
import Waypoint from 'react-waypoint';
import GalleryIndicators from './GalleryIndicators/GalleryIndicators';
import './Gallery.css';

export default class Gallery extends React.Component {
  state = {
    currentImageIndex: 0,
    ratio: 0,
    isVisible: false,
  }

  componentWillMount() {
    this.setVars();
    this.cycleImages();
    this.setRatio();
  }

  componentWillUnmount() {
    clearInterval(this.int);
  }

  setVars = () => {
    const { currentImageIndex } = this.state;
    this.lastImage = this.props.images.length - 1;
    this.isFirstImage = currentImageIndex <= 0;
    this.isLastImage = this.lastImage > currentImageIndex;
    this.nextImage = currentImageIndex + 1;
    this.previousImage = currentImageIndex - 1;
  }

  setRatio = () => {
    const ratios = this.props.images.map(image => image.dimensions.height / image.dimensions.width);
    const smallestRatio = Math.min(...ratios) * 100;
    this.setState({ ratio: smallestRatio });
  }

  cycleImages = () => {
    if (this.state.isVisible) {
      this.int = setInterval(() => {
        this.handleNextImage();
      }, 3000);
    }
  }

  stopTimer = () => {
    clearInterval(this.int);
  }

  resetTimer = () => {
    this.stopTimer();
    this.cycleImages();
  }

  goToImage = (num) => {
    this.resetTimer();
    this.setState({
      currentImageIndex: num,
    });
  }

  handleNextImage = () => {
    this.setVars();
    if (this.isLastImage) {
      this.goToImage(this.nextImage);
    } else {
      this.goToImage(0);
    }
  }


  handlePrevImage = () => {
    this.setVars();
    if (this.isFirstImage) {
      this.goToImage(this.lastImage);
    } else {
      this.goToImage(this.previousImage);
    }
  }

  enableVisibility = () => {
    this.setState({ isVisible: true });
    this.cycleImages();
  }

  disableVisibility = () => {
    this.setState({ isVisible: false });
    this.stopTimer();
  }

  render() {
    const { currentImageIndex, ratio } = this.state;
    const { images } = this.props;

    const galleryItems = images.map((img, index) => {
      const imageIsCurrent = index === currentImageIndex;
      const classes = [
        'caseStudy__gallery__img',
        imageIsCurrent
          ? 'caseStudy__gallery__img--current'
          : '',
      ].join(' ');

      return (
        <img
          src={img.url}
          key={img.url}
          alt={this.props.title}
          className={classes}
        />
      );
    });

    const classes = [
      'caseStudy__gallery grid',
      '-wrap',
      this.props.animate === 'false'
        ? 'caseStudy__gallery--noZoom'
        : '',
    ].join(' ');

    return (
      <Waypoint
        onEnter={this.enableVisibility}
        onLeave={this.disableVisibility}
      >
        <div className={classes}>
          <div
            className="caseStudy__gallery__imageContainer"
            style={{ paddingTop: `${ratio}%` }}
          >
            <div className="caseStudy__gallery__nav">
              <div
                className="caseStudy__gallery__nav__item--prev caseStudy__gallery__nav__item"
                onClick={this.handlePrevImage}
              />
              <div
                className="caseStudy__gallery__nav__item--next caseStudy__gallery__nav__item"
                onClick={this.handleNextImage}
              />
            </div>
            {galleryItems}
          </div>
          <GalleryIndicators
            images={images}
            currentImageIndex={currentImageIndex}
            goToImage={this.goToImage}
          />
        </div>
      </Waypoint>
    );
  }
}
