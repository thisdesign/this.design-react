import React from 'react';
import { RichText } from 'prismic-reactjs';
import styled, { css } from 'styled-components';
import { SectionTitle } from 'containers/About/styles';

export default class Timeline extends React.Component {
  state={
    years: null,
  }
  componentDidMount() {
    this.getTimelineDoc();
  }
  getTimelineDoc() {
    this.props.prismicCtx.api.getSingle('timeline').then((doc) => {
      if (doc) {
        this.setState({
          years: doc.data.body.map(item => ({
            yearName: RichText.asText(item.primary.year),
            projects: item.items,
          })),
        });
      }
    });
  }


  render() {
    if (this.state.years) {
      return (
        <div className="about__block -wrap--lg -wrap -spaceBelow">
          <SectionTitle>The work we&apos;ve done</SectionTitle>
          {this.state.years.map(({ yearName, projects }) =>
            <Year key={yearName} yearName={yearName} projects={projects} />)}
        </div>
      );
    }
    return null;
  }
}

const Year = ({ yearName, projects }) => (
  <YearWrapper>
    <h2>{yearName}</h2>
    <ColumnWrapper>
      {projects.map(({ name, description, roles }) => (
        <Column key={RichText.asText(name)}>
          <ProjectTitle>{RichText.render(name)}</ProjectTitle>
          <ProjectDesc>{RichText.asText(description)}</ProjectDesc>
          <ProjectRoles>{RichText.asText(roles)}</ProjectRoles>
        </Column>
      ))}
    </ColumnWrapper>
  </YearWrapper>
);

const small = css`
  font-size: .9em;
`;

const YearWrapper = styled.div`
  margin: 4rem 0;
`;

const ProjectRoles = styled.div`
  ${small}
  font-style: italic;
`;

const ProjectDesc = styled.div`
  ${small}
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1rem;
`;

const Column = styled.div`
  width: 33%;
  margin: 1rem 0;
  line-height: 1.75;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const ProjectTitle = styled.h4`
  a,
  p {
    color: white!important;
  }

  a{
    text-decoration: underline;
  }
`;
