import React, { createContext } from 'react'
import { useData } from 'structure/DataProvider'
import Hero from './Hero'
// import PropTypes from 'prop-types'

export const CaseStudyCtx = createContext()

const CaseStudy = ({ uid }) => {
  const { allCaseStudies } = useData()
  const csData = allCaseStudies.filter(item => item.uid === uid)[0]

  return (
    <CaseStudyCtx.Provider value={csData}>
      <Hero />
      <div>CONTENT HERE!!!!!!!!!!!!</div>
    </CaseStudyCtx.Provider>
  )
}
// CaseStudy.propTypes = {}

export default CaseStudy
