import React from 'react'
import { useData } from 'structure/DataProvider'
import Wrap from 'components/Wrap'
import Section from 'components/Section'

import Styled from './Styled'
// import PropTypes from 'prop-types'

function Work() {
  const data = useData()

  return (
    <Section>
      <Wrap>
        <Styled.Wrapper>
          {data.allCaseStudies.map(item => (
            <WorkItem
              image={item.data.thumbnail.url}
              uid={item.uid}
              key={item.uid}
              title={item.data.title}
            />
          ))}
        </Styled.Wrapper>
      </Wrap>
    </Section>
  )
}

function WorkItem({ uid, image, title }) {
  return (
    <Styled.WorkItem to={`/work/${uid}`}>
      <Styled.Img src={image} width={320} format="jpg" quality={60} />
      <div>{title}</div>
    </Styled.WorkItem>
  )
}

export default Work
