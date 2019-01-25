import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';

const _getContextProps = (data) => {
  const {
    title,
    copy,
    services,
    image2,
    image1,
    video2,
    video1,
    floating_media_width: auxWidth,
    mobileImage,
  } = data.header[0];

  const header = {
    backgroundColor: data.color,
    title: RichText.render(title),
    description: RichText.render(copy),
    services: RichText.render(services),
    auxItem: {
      videoUrl: video1.url,
      imageUrl: image2.url,
      width: auxWidth,
    },
    background: {
      videoUrl: video2.url,
      imageUrl: image1.url,
      mobileImage: mobileImage.url,
    },
  };
  return { ...{ header } };
};

export const _contextPropTypes = {
  value: PropTypes.shape({
    header: PropTypes.shape({
      backgroundColor: PropTypes.string.isRequired,
      title: PropTypes.element.isRequired,
      description: PropTypes.element.isRequired,
      services: PropTypes.element.isRequired,
      auxItem: PropTypes.shape({
        videoUrl: PropTypes.string,
        imageUrl: PropTypes.string,
        width: PropTypes.number,
      }).isRequired,
      background: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
  }),
};
export default _getContextProps;
