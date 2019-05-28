import React from 'react'
import qs from 'qs'
import Prismic from 'prismic-javascript'
import Cookies from 'js-cookie'
import PrismicConfig from '../config/prismic-configuration'

const PREVIEW_EXPIRES = 1 / 48 // 30 minutes

export default class Preview extends React.Component {
  componentWillMount() {
    this.preview(this.props)
  }

  preview(props) {
    const params = qs.parse(this.props.location.search.slice(1))
    Prismic.getApi(PrismicConfig.apiEndpoint).then(api => {
      api
        .previewSession(params.token, PrismicConfig.linkResolver, '/')
        .then(url => {
          Cookies.set(Prismic.previewCookie, params.token, {
            expires: PREVIEW_EXPIRES,
          })
          props.history.push(url)
        })
    })
  }

  render() {
    return <p>Loading previews...</p>
  }
}
