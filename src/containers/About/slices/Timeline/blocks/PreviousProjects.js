import React from 'react';
import { RichText } from 'prismic-reactjs';
import { ColumnWrapper, FullHeightWrapper } from 'containers/About/styles';
import { YearWrapper, Project } from './blocks';

const PreviousProjects = ({ years }) => (
  <FullHeightWrapper large>
    {years.map(({ yearName, projects }) =>
      <Year key={yearName} yearName={yearName} projects={projects} />)}
  </FullHeightWrapper>
);


export const Year = ({ yearName, projects }) => (
  <YearWrapper>
    <h2>{yearName}</h2>
    <ColumnWrapper>
      {projects.map(({ name, description, roles }) => (
        <Project key={RichText.asText(name)} items={3}>
          <Project.Title>{RichText.render(name)}</Project.Title>
          <Project.Desc>{RichText.asText(description)}</Project.Desc>
          <Project.Roles>{RichText.asText(roles)}</Project.Roles>
        </Project>
      ))}
    </ColumnWrapper>
  </YearWrapper>
);

export default PreviousProjects;
