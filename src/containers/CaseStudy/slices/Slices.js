import React from 'react';
import { RichText } from 'prismic-reactjs';
import WaypointAnim from 'components/WaypointAnim/WaypointAnim';
import Text from './Text/Text';
import Gallery from './Gallery/Gallery';
import Columns from './Columns/ColumnsWrapper';
import Image from './Image/ImageWrapper';
import Video from './Video/Video';
import Pullquote from './Pullquote/Pullquote';
import Website from './Website/WebsiteWrapper';
import Diptych from './Diptych/DiptychWrapper';

const Slice = ({ children, type }) => (
  <WaypointAnim className={`casestudy__block casestudy__block--${type}`} >
    {children}
  </WaypointAnim>
);

const Slices = ({ sliceData, title }) => {
  const slices = sliceData.map((data) => {
    const atts = { data, title };
    switch (data.slice_type) {
      case 'text':
        return <Text value={RichText.render(data.value)} type="text" />;
      case 'columns':
      case 'columns-v2':
        return <Columns.Wrapper {...atts} />;
      case 'image':
      case 'image-v2':
        return <Image.Wrapper {...atts} type="image" />;
      case 'diptych':
      case 'diptych-v2':
        return <Diptych.Wrapper {...atts} type="diptych" />;
      case 'video':
        return <Video {...atts} type="video" />;
      case 'gallery':
      case 'gallery-v2':
        return <Gallery {...atts} type="gallery" />;
      case 'pullquote':
        return <Pullquote {...atts} type="pullquote" />;
      case 'website':
        return <Website.Wrapper {...atts} />;
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
