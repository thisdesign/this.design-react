import { useContext, useEffect } from 'react'
import { ApiDataCtx } from 'containers/App/App'
import qs from 'qs'

const linkResolver = doc => {
  console.log('linkResolver', { doc })
  if (doc.type === 'casestudy') return `/work/${doc.uid}`
  if (doc.type === 'context') return `/@${doc.uid}/?reload=true`
  if (doc.type === 'about') return `/about/`
  return '/'
}

function Preview(props) {
  const { api } = useContext(ApiDataCtx)

  useEffect(() => {
    const { token } = qs.parse(props.location.search.slice(1))
    const pureToken = token.split('?')[0]

    api.previewSession(pureToken, linkResolver, '/').then(url => {
      props.history.push(url)
      window.location.reload()
    })
  })

  return 'Loading previews...'
}

export default Preview
