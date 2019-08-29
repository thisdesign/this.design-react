import React, { createContext, useContext } from 'react'
import { useData } from 'structure/DataProvider'
import Section from 'components/Section'
import Wrap from 'components/Wrap'
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
  return data.content.map(slice => {
    return (
      <Section>
        <Wrap.Nav>{slice.slice_type}</Wrap.Nav>
      </Section>
    )
  })
}
// CaseStudy.propTypes = {}

export default CaseStudy
