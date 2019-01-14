import React from 'react';
import { RichText } from 'prismic-reactjs';
import styled, { css } from 'styled-components';
import { SectionTitle, Wrapper, ColumnWrapper, Column } from 'containers/About/styles';

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
        <Wrapper className="about__block">
          <SectionTitle>The work we&apos;ve done</SectionTitle>
          {this.state.years.map(({ yearName, projects }) =>
            <Year key={yearName} yearName={yearName} projects={projects} />)}
        </Wrapper>
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
        <TimelineCol key={RichText.asText(name)} items={3}>
          <ProjectTitle>{RichText.render(name)}</ProjectTitle>
          <ProjectDesc>{RichText.asText(description)}</ProjectDesc>
          <ProjectRoles>{RichText.asText(roles)}</ProjectRoles>
        </TimelineCol>
      ))}
    </ColumnWrapper>
  </YearWrapper>
);

const small = css`
  font-size: .9em;
`;

const TimelineCol = styled(Column)`
  margin-bottom: 1rem;
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

const ProjectTitle = styled.h4`
  a,
  p {
    color: white!important;
  }

  a{
    text-decoration: underline;
  }
`;
