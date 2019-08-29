import React, { useContext } from 'react'
import { useData } from 'structure/DataProvider'
import Wrap from 'components/Wrap'
import Section from 'components/Section'
import { LayoutCtx } from 'structure/Layout'
import useSaved from 'hooks/useSaved'
import formatAlt from 'util/formatAlt'
import { ImgShell } from 'components/LazyImg'
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
  const { view } = useContext(LayoutCtx)
  const hasViewed = useSaved(view === 'work')

  return (
    <Styled.WorkItem to={`/work/${uid}`}>
      <ImgShell
        show={hasViewed}
        aspect={2 / 3}
        src={image}
        alt={formatAlt(title)}
      />
      <div>{title}</div>
    </Styled.WorkItem>
  )
}

export default Work
