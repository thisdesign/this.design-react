import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useData } from 'structure/DataProvider'
import Wrap from 'components/Wrap'
import Section from 'components/Section'
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
  const dispatch = useDispatch()
  const view = useSelector(state => state.view)
  const hasViewed = useSaved(view === 'work')

  const [isHovered, toggleHovered] = useState(false)

  const handleMouseEnter = () => {
    toggleHovered(true)
    dispatch({ type: 'HOVER_ITEM', payload: { uid } })
  }

  const handleMouseLeave = () => {
    dispatch({ type: 'UNHOVER_ITEM' })
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
