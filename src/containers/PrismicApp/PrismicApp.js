import React from 'react'
import 'whatwg-fetch'
import Prismic from 'prismic-javascript'
import CursorDotProvider from 'components/CursorDot/CursorDotProvider'
import PrismicConfig from './config/prismic-configuration'
import Router from '../../containers/Router/Router'

class PrismicApp extends React.Component {
  state = {
    prismicCtx: null,
  }

  componentWillMount() {
    this.buildContext()
      .then(prismicCtx => {
        this.setState({ prismicCtx })
      })
      .catch(e => {
        console.error(
          `Cannot contact the API, check your prismic configuration:\n${e}`
        )
      })
  }

  refreshToolbar() {
    const maybeCurrentExperiment = this.api.currentExperiment()
    if (maybeCurrentExperiment) {
      window.PrismicToolbar.startExperiment(maybeCurrentExperiment.googleId())
    }
    window.PrismicToolbar.setup(PrismicConfig.apiEndpoint)
  }

  buildContext() {
    const { accessToken } = PrismicConfig
    return Prismic.api(PrismicConfig.apiEndpoint, { accessToken }).then(
      api => ({
        api,
        endpoint: PrismicConfig.apiEndpoint,
        accessToken,
        linkResolver: PrismicConfig.linkResolver,
        toolbar: this.refreshToolbar,
      })
    )
  }

  render() {
    return (
      <CursorDotProvider>
        <Router prismicCtx={this.state.prismicCtx} />
      </CursorDotProvider>
    )
  }
}

export default PrismicApp
