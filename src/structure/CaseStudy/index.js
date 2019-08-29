import React, { createContext, useContext } from 'react'
import { useData } from 'structure/DataProvider'
import Section from 'components/Section'
import Wrap from 'components/Wrap'
import FadeIn from 'components/FadeIn'
import Image from 'slices/Image'
import Hero from './Hero'
// import PropTypes from 'prop-types'

export const CaseStudyDataCtx = createContext()

const CaseStudy = ({ uid }) => {
  const { allCaseStudies } = useData()
  const csData = allCaseStudies.filter(item => item.uid === uid)[0]

  return (
    <CaseStudyDataCtx.Provider value={csData}>
      <Hero />
      <Slices />
    </CaseStudyDataCtx.Provider>
  )
}

function Slices() {
  const { data } = useContext(CaseStudyDataCtx)
  return data.content
    .map(slice => {
      switch (slice.slice_type) {
        case 'image-v2':
          return <Image.CSDataWrapper data={slice} />
        default:
          return slice.slice_type
      }
    })
    .map((item, i) => (
      <Section key={`${data.content[i].slice_type}${i}`}>
        <FadeIn>
          <Wrap.Nav>{item}</Wrap.Nav>
        </FadeIn>
      </Section>
    ))
}
// CaseStudy.propTypes = {}

export default CaseStudy
