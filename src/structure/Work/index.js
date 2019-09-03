import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { useData } from 'structure/DataProvider'
import Wrap from 'components/Wrap'
import Section from 'components/Section'
import { LayoutCtx } from 'structure/Layout'
import useSaved from 'hooks/useSaved'
import formatAlt from 'util/formatAlt'
import LazyImg from 'components/LazyImg'
import Styled from './Styled'
// import PropTypes from 'prop-types'

function Work() {
  const data = useData()

  return (
    <Section>
      <Wrap>
        <Styled.Wrapper>
          {data.ctxCaseStudies.map(item => (
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
  const view = useSelector(state => state.view)
  const hasViewed = useSaved(view === 'work')
  const { setHoveredCsUID } = useContext(LayoutCtx)

  const [isHovered, toggleHovered] = useState(false)

  const handleMouseEnter = () => {
    setHoveredCsUID(uid)
    toggleHovered(true)
  }

  const handleMouseLeave = () => {
    setHoveredCsUID(null)
    toggleHovered(false)
  }

  return (
    <Styled.WorkItem
      to={`/work/${uid}`}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      transitionName="FROM_WORK"
    >
      <LazyImg
        show={hasViewed}
        aspect={2 / 3}
        src={image}
        alt={formatAlt(title)}
      />
      <Styled.Title isHovered={isHovered}>{title}</Styled.Title>
    </Styled.WorkItem>
  )
}

export default Work
