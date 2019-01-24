import React from 'react';
import { ColumnWrapper, FullHeightWrapper, SectionTitle } from 'containers/About/styles';
import { RichText } from 'prismic-reactjs';
import { Project } from './blocks';

const CurrentProjects = ({ categories }) => (
  <FullHeightWrapper large>
    <SectionTitle>The work we&apos;ve done</SectionTitle>
    <ColumnWrapper>
      { categories.map(({ category, items }) => (
        <Project key={category} items={4}>
          <h4>{category}</h4>
          {RichText.render(items)}
        </Project>
      ))}
    </ColumnWrapper>
  </FullHeightWrapper>
);

export default CurrentProjects;
