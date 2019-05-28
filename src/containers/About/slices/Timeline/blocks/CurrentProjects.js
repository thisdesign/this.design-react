import React from 'react'
import { About } from 'containers/About/styles'
import { RichText } from 'prismic-reactjs'
import { Project } from './blocks'

const CurrentProjects = ({ categories }) => (
  <About.FullHeightWrapper large>
    <About.SectionTitle>The work we&apos;ve done</About.SectionTitle>
    <About.ColumnWrapper>
      {categories.map(({ category, items }) => (
        <Project key={category} items={4}>
          <h4>{category}</h4>
          {RichText.render(items)}
        </Project>
      ))}
    </About.ColumnWrapper>
  </About.FullHeightWrapper>
)

export default CurrentProjects
