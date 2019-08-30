import React, { createContext } from 'react'
import { useData } from 'structure/DataProvider'
import { LayoutCtx } from 'structure/Layout'
import Hero from './Hero'
import Slices from './Slices'
import Styled from './Styled'

export const CaseStudyDataCtx = createContext()

const CaseStudy = ({ uid }) => {
  const { ctxCaseStudies } = useData()
  const csData = ctxCaseStudies.filter(item => item.uid === uid)[0]
  const { mainRef } = React.useContext(LayoutCtx)

  const [isLoaded, toggleLoaded] = React.useState(false)

  const $main = mainRef.current
  React.useEffect(() => {
    setInterval(() => toggleLoaded(true), 1500)

    console.log('mounted')
    if ($main) {
      $main.scrollTo(0, 0)
    }
  }, [$main])

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
