/* eslint no-case-declarations: 0 */
import React from 'react';
import { RichText } from 'prismic-reactjs';
import Text from './Text/Text';
import Gallery from './Gallery/Gallery';
import Columns from './Columns/Columns';
import Image from './Image/Image';
import Video from './Video/Video';
import Pullquote from './Pullquote/Pullquote';
import Website from './Website/Website';
import Diptych from './Diptych/Diptych';

const Slice = ({ children, type }) => (
  <div className={`casestudy__block casestudy__block--${type}`} >
    {children}
  </div>
);

const Slices = ({ sliceData, title }) => {
  const slices = sliceData.map((data) => {
    const atts = { data, title };
    switch (data.slice_type) {
      case 'text':
        return <Text value={RichText.render(data.value)} type="text" />;
      case 'columns':
      case 'columns-v2':
        const cms = data.value
          ? data.value[0] // v1 structure
          : data.primary; // v2 structure
        // console.log(cms.image);
        return (
          <Columns
            {...atts}
            isRight={cms.right === 'right'}
            type="columns"
            text={RichText.render(cms.text)}
            size={(() => {
              switch (cms.layout) {
                case '-column--2of3':
                  return 'large';
                case '-column--1of3':
                case '-website':
                case '-mobile':
                  return 'small';
                default:
                  return null;
              }
            })()}
            layout={cms.layout}
            videoUrl={cms.video.url}
            hasMute={cms.audio !== null}
            imageUrl={(() => {
              const idealSize = 'size_1024';
              return cms.image[idealSize]
                ? cms.image[idealSize].url
                : cms.image.url;
            })()}
          />);
      case 'image':
      case 'image-v2':
        return <Image {...atts} type="image" />;
      case 'diptych':
      case 'diptych-v2':
        return <Diptych {...atts} type="diptych" />;
      case 'video':
        return <Video {...atts} type="video" />;
      case 'gallery':
      case 'gallery-v2':
        return <Gallery {...atts} type="gallery" />;
      case 'pullquote':
        return <Pullquote {...atts} type="pullquote" />;
      case 'website':
        return <Website {...atts} type="website" />;
      default:
        console.error('nothing built for', data.slice_type); //eslint-disable-line
        return <React.Fragment />;
    }
  });
  return slices.map((slice, i) => (
    <Slice type={slice.props.type} key={slice.props.type + i}>
      {slice}
    </Slice>
  ));
};

export default Slices;
