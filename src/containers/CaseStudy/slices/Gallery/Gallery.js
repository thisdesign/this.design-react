import React from 'react';
import GalleryIndicators from './GalleryIndicators/GalleryIndicators';
import './Gallery.css';

export default class Gallery extends React.Component {
  state = {
    images: this.props.data.items
      ? this.props.data.items.map(img => img.image) // v2
      : this.props.data.value.map(img => img.image), // old
    currentImageIndex: 0,
    ratio: 0,
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
    const { currentImageIndex, images } = this.state;
    this.lastImage = images.length - 1;
    this.isFirstImage = currentImageIndex <= 0;
    this.isLastImage = this.lastImage > currentImageIndex;
    this.nextImage = currentImageIndex + 1;
    this.previousImage = currentImageIndex - 1;
  }

  setRatio = () => {
    const ratios = this.state.images.map(image => image.dimensions.height / image.dimensions.width);
    const smallestRatio = Math.min(...ratios) * 100;
    this.setState({ ratio: smallestRatio });
  }

  cycleImages = () => {
    this.int = setInterval(() => {
      this.handleNextImage();
    }, 3000);
  }

  resetTimer = () => {
    clearInterval(this.int);
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

  render() {
    const { images, currentImageIndex, ratio } = this.state;
    const shouldZoom = this.props.data.primary
      ? this.props.data.primary.zoom_animation_enabled
      : null;

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
      shouldZoom === 'false'
        ? 'caseStudy__gallery--noZoom'
        : '',
    ].join(' ');

    return (
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
    );
  }
}
