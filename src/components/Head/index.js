import React from 'react'
import Helmet from 'react-helmet'
import formatTitle from 'util/formatTitle'
import PropTypes from 'prop-types'
import config from 'site.config'

function Head({ title, description }) {
  return (
    <Helmet>
      <title>{title ? formatTitle(title) : config.siteTitle}</title>
      <meta name="description" content={description || config.description} />
    </Helmet>
  )
}

Head.defaultProps = {
  title: null,
  description: null,
}

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

export default Head
