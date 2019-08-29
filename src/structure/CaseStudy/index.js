import React, { createContext } from 'react'
import { useData } from 'structure/DataProvider'
import Hero from './Hero'
import Slices from './Slices'

export const CaseStudyDataCtx = createContext()

const CaseStudy = ({ uid }) => {
  const { ctxCaseStudies } = useData()
  const csData = ctxCaseStudies.filter(item => item.uid === uid)[0]

  return (
    <CaseStudyDataCtx.Provider value={csData}>
      <Hero />
      <Slices />
    </CaseStudyDataCtx.Provider>
  )
}

export default CaseStudy
