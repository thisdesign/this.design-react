import React from 'react';
import './Gallery.css';

export default class App extends React.Component {
  state = {
    images: this.props.data.value.map(img => img.image),
    currentImageIndex: 0,
  }

  componentWillMount() {
    this.cycleImages();
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
    const { images, currentImageIndex } = this.state;

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

    return (
      <div
        className="caseStudy__gallery grid"
        role="button"
        tabIndex="0"
        onClick={() => this.changeImage(1)}
      >
        {galleryItems}
      </div>
    );
  }
}
