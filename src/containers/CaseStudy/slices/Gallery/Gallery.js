import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import LayoutContext from 'containers/Layout/LayoutContext';
import styled, { css } from 'styled-components';
import GalleryIndicators from './GalleryIndicators/GalleryIndicators';
import './Gallery.scss';

export default class Gallery extends React.Component {
  static contextType = LayoutContext;

  static propTypes = {
    animate: PropTypes.bool.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    ratio: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }

  state = {
    currentImageIndex: 0,
    isVisible: false,
  }

  componentWillMount() {
    this.setVars();
    this.cycleImages();
  }

  componentWillUnmount() {
    clearInterval(this.int);
  }

  setVars = () => {
    const { currentImageIndex } = this.state;
    this.lastImage = this.props.imageUrls.length - 1;
    this.isFirstImage = currentImageIndex <= 0;
    this.isLastImage = this.lastImage > currentImageIndex;
    this.nextImage = currentImageIndex + 1;
    this.previousImage = currentImageIndex - 1;
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
    const { currentImageIndex } = this.state;
    const {
      imageUrls, ratio, title, animate,
    } = this.props;

    const galleryItems = imageUrls.map((url, index) => (
      <Image
        src={url}
        key={url}
        alt={title}
        current={index === currentImageIndex}
        animate={animate}
      />
    ));
    return (
      <Waypoint
        onEnter={this.enableVisibility}
        onLeave={this.disableVisibility}
      >
        <div>
          <GalleryWrapper className="GalleryWrapper grid -wrap">
            <ImageContainer ratio={ratio} className="ImageContainer">
              <OverlayNav className="OverlayNav">
                <NavItem.Prev onClick={this.handlePrevImage} className="NavItem-Prev" />
                <NavItem.Next onClick={this.handleNextImage} className="NavItem-Next" />
              </OverlayNav>
              {galleryItems}
            </ImageContainer>
            <GalleryIndicators
              imageUrls={imageUrls}
              currentImageIndex={currentImageIndex}
              goToImage={this.goToImage}
              dark={this.context.csData.isDark}
            />
          </GalleryWrapper>
        </div>
      </Waypoint>
    );
  }
}

const OverlayNav = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const NavItem = styled.div`
  height: 100%;
  position: absolute;
}`;

NavItem.Prev = styled(NavItem)`
  left: 0;
  width: 25%;
  cursor: w-resize;
`;

NavItem.Next = styled(NavItem)`
  left: 25%;
  width: 75%;
  cursor: e-resize;
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  padding-top: ${({ ratio }) => `${ratio}%`}}}
`;

const Image = styled.img`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: scale(1.035);
  width: 100%;
  opacity: 0;

  ${({ animate }) => animate && css`
    transition:
      900ms opacity cubic-bezier(.4, 0, .2, 1),
      900ms transform cubic-bezier(.4, 0, .2, 1);
  `}

  ${({ current }) => current && css`
    opacity: 1;
    transform: scale(1);
  `}
`;

const GalleryWrapper = styled.div`
  position: relative;
`;
