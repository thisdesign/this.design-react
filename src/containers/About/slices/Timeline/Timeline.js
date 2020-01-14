import React, { useContext, useState, useEffect } from 'react'
import { RichText } from 'prismic-reactjs'
import { ApiDataCtx } from 'containers/App/App'
import Styled from './Styled'

const useTimelineData = id => {
  const { api } = useContext(ApiDataCtx)
  const [timelineData, setTimelineData] = useState(null)
  useEffect(
    () => {
      api.getByID(id).then(res => setTimelineData(res.data))
    },
    [api, id]
  )

  return timelineData
}

const Timeline = ({ data }) => {
  const timelineData = useTimelineData(data.primary.link.id)

  if (timelineData) {
    return <Years data={timelineData} />
  }
  return null
}

const Years = ({ data }) => {
  const items = data.body
  return (
    <div className="-wrap">
      {items.map(item => {
        const yearName = RichText.asText(item.primary.year)
        return (
          <Styled.Year key={yearName}>
            <h2>{yearName}</h2>
            <Projects items={item.items} />
          </Styled.Year>
        )
      })}
    </div>
  )
}

const Projects = ({ items }) => {
  return (
    <Styled.ProjectYear>
      {items.map(item => (
        <Styled.Project>
          <Styled.Title>{RichText.asText(item.name)}</Styled.Title>
          <Styled.Description>
            {RichText.asText(item.description)}
          </Styled.Description>
          <h3>{RichText.asText(item.roles)}</h3>
        </Styled.Project>
      ))}
    </Styled.ProjectYear>
  )
}

export default Timeline
