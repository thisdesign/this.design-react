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
        this.data = data.value
          ? data.value[0] // v1 structure
          : data.primary; // v2 structure
        return (
          <Columns
            {...atts}
            isRight={this.data.right === 'right'}
            type="columns"
            text={RichText.render(this.data.text)}
            size={(() => {
              switch (this.data.layout) {
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
            layout={this.data.layout}
            videoUrl={this.data.video.url}
            hasMute={this.data.audio !== null}
            imageUrl={(() => {
              const idealSize = 'size_1024';
              return this.data.image[idealSize]
                ? this.data.image[idealSize].url
                : this.data.image.url;
            })()}
          />);

      case 'image':
      case 'image-v2':
        console.log(data.value[0]);
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
        this.data = data.primary;
        return (
          <Website
            background={this.data.background}
            imageUrl={this.data.screenshot.url}
            layout={this.data}
            videoUrl={this.data.video.url}
            frameColor={this.data.frame_color}
            dotColor={this.data.dot_color}
            type="website"
          />
        );
      case 'mobile':
        [this.data] = data.value;
        return (
          <Columns
            type="columns"
            audio={this.data.audio}
            text={RichText.render(this.data.text)}
            videoUrl={this.data.video.url}
            right={this.data.right}
            layout="-mobile"
          />
        );
      default:
        console.error('nothing built for', data.slice_type); //eslint-disable-line
        return <div type="notFound" />;
    }
  });

  return slices.map((slice, i) => (
    <Slice type={slice.props.type} key={`${slice.props.type}${i}`}>
      {slice}
    </Slice>
  ));
};

export default React.memo(Slices);
