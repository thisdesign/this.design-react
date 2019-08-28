import React from 'react'
import { useData } from 'structure/DataProvider'
import Wrap from 'components/Wrap'
import Section from 'components/Section'
// import PropTypes from 'prop-types'

function Work() {
  const data = useData()

  return (
    <Section>
      <Wrap>
        {data.allCaseStudies.map(item => (
          <div key={item.uid}>{item.uid}</div>
        ))}
      </Wrap>
    </Section>
  )
}

// Work.propTypes = {}

export default Work
