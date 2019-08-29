import React, { createContext } from 'react'
import { useData } from 'structure/DataProvider'
import Hero from './Hero'
import Slices from './Slices'

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

export default CaseStudy
