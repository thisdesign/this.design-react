import React from 'react'
import { RichText } from 'prismic-reactjs'
import CurrentProjects from './blocks/CurrentProjects'
import PreviousProjects from './blocks/PreviousProjects'

export default class Timeline extends React.Component {
  state = {
    years: null,
  }

  componentDidMount() {
    this.getTimelineDoc()
  }

  getTimelineDoc() {
    this.props.prismicCtx.api.getSingle('timeline').then(doc => {
      if (doc) {
        this.setState({
          loaded: true,
          current: { items: doc.data.current },
          years: doc.data.body.map(item => ({
            yearName: RichText.asText(item.primary.year),
            projects: item.items,
          })),
        })
      }
    })
  }

  render() {
    if (this.state.loaded) {
      return (
        <>
          <CurrentProjects categories={this.state.current.items} />
          <PreviousProjects years={this.state.years} />
        </>
      )
    }
    return null
  }
}
