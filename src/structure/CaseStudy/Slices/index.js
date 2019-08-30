import React, { useContext } from 'react'
import { CaseStudyDataCtx } from 'structure/CaseStudy'
import Section from 'components/Section'
import Image from 'slices/Image'
import Text from 'slices/Text'

export default function Slices() {
  const { data } = useContext(CaseStudyDataCtx)
  return data.content
    .map(slice => {
      switch (slice.slice_type) {
        case 'image-v2':
          return <Image.CSDataWrapper data={slice} />
        case 'text':
          return <Text.CSDataWrapper data={slice} />

        default:
          return slice.slice_type
      }
    })
    .map((item, i) => (
      <Section key={`${data.content[i].slice_type}${i}`}>{item}</Section>
    ))
}
