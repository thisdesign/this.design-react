import React from 'react';
import './Gallery.css';

export default class App extends React.Component {
  state = {
    images: this.props.data.value.map(img => img.image),
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
      this.changeImage(1);
    }, 5000);
  }


  changeImage = (num) => {
    const { currentImageIndex, images } = this.state;
    const nextImage = ((images.length - 1) > currentImageIndex)
      ? currentImageIndex + num
      : 0;
    this.setState({
      currentImageIndex: nextImage,
    });
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
          alt={img.alt}
          className={classes}
        />
      );
    });

    const indicators = images.map((img, index) => {
      const className = 'caseStudy__gallery__indicator';
      const classes = (index === currentImageIndex)
        ? `${className} ${className}--active`
        : className;

      return (
        <div className={classes} />
      );
    });

    return (
      <div className="caseStudy__gallery grid -wrap">
        <div
          className="caseStudy__gallery__imageContainer"
          role="button"
          tabIndex="0"
          onClick={() => this.changeImage(1)}
          style={{ paddingTop: `${ratio}%` }}
        >
          {galleryItems}
        </div>
        <div className="caseStudy__gallery__indicators">
          {indicators}
        </div>
      </div>
    );
  }
}
