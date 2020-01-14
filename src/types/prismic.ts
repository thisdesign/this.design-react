export interface PrismicDocument {
  id: string
  uid: string
  type: string
  href: string
  tags: string[]
  first_publication_date: string
  last_publication_date: string
  slugs: string[]
  linked_documents: any[]
  lang: string
  alternate_languages: string[]
}

export interface PrismicImage {
  dimensions: {
    width: number
    height: number
  }
  alt: string | void
  copyright: string | void
  url: string | void
}

export type PrismicRichText = {
  type: string
  text: string
  spans: []
}[]
