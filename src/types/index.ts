import { PrismicDocument, PrismicImage } from './prismic'

interface Thumbnail extends PrismicImage {
  large: PrismicImage
}

export interface CaseStudyDoc extends PrismicDocument {
  data: {
    text_color: string
    background_color: string
    title: string
    thumbnail: Thumbnail
  }
}
