import React from 'react'
import { useData } from 'structure/DataProvider'
import Wrap from 'components/Wrap'
import Section from 'components/Section'
import resizeImg from 'util/resizeImg'
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
  const resizedImg = resizeImg(image, { w: 600, format: 'webp' })

  return (
    <Styled.WorkItem to={`/work/${uid}`}>
      <Styled.Image image={resizedImg} key={uid}>
        {title}
      </Styled.Image>
    </Styled.WorkItem>
  )
}
// Work.propTypes = {}

export default Work
