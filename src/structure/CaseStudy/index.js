import React, { createContext } from 'react'
import { useData } from 'structure/DataProvider'
import Hero from './Hero'
import Slices from './Slices'
import Styled from './Styled'

export const CaseStudyDataCtx = createContext()

const CaseStudy = ({ uid }) => {
  const { ctxCaseStudies } = useData()
  const csData = ctxCaseStudies.filter(item => item.uid === uid)[0]

  const [isLoaded, toggleLoaded] = React.useState(false)

  React.useEffect(() => {
    window.scrollTo(0, 0)
    setInterval(() => toggleLoaded(true), 1500)
  }, [])

  return (
    <CaseStudyDataCtx.Provider value={csData}>
      <Styled.CaseStudy
        bg={csData.data.background_color}
        text={csData.data.text_color}
      >
        <Hero />
        {isLoaded && <Slices />}
      </Styled.CaseStudy>
    </CaseStudyDataCtx.Provider>
  )
}

export default CaseStudy
