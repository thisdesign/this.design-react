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
    this.cycleImages();
    this.setRatio();
  }

  setRatio = () => {
    const ratios = this.state.images.map(image => image.dimensions.height / image.dimensions.width);
    const smallestRatio = Math.min(...ratios) * 100;
    this.setState({ ratio: smallestRatio });
  }

  cycleImages = () => {
    setInterval(() => {
      this.handleNextImage();
    }, 5000);
  }


  goToImage = (num) => {
    this.setState({
      currentImageIndex: num,
    });
  }

  handleNextImage = () => {
    const { currentImageIndex, images } = this.state;
    const lastImage = images.length - 1;
    const nextImage = currentImageIndex + 1;
    const isLastImage = lastImage > currentImageIndex;

    if (isLastImage) {
      this.goToImage(nextImage);
    } else {
      this.goToImage(0);
    }
  }

  render() {
    const { images, currentImageIndex, ratio } = this.state;

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

    return (
      <div className="caseStudy__gallery grid -wrap">
        <div
          className="caseStudy__gallery__imageContainer"
          onClick={this.handleNextImage}
          style={{ paddingTop: `${ratio}%` }}
        >
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
