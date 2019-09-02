import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Head from 'components/Head'
import { RichText } from 'prismic-reactjs'
import { useData } from './DataProvider'
import Layout from './Layout'

function Router() {
  const data = useData()

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={data.ctxCaseStudies.map(item => `/work/${item.uid}`)}
          render={({ match }) => {
            const uid = match.path.split('/')[2]
            const doc = data.ctxCaseStudies.filter(item => item.uid === uid)[0]
            const desc = RichText.asText(doc.data.header[0].copy)
            return (
              <>
                <Head title={doc.data.title} description={desc} />
                <Layout view="root" workUid={uid} />
              </>
            )
          }}
        />
        <Route
          path="/about/"
          render={() => (
            <>
              <Head title="About" />
              <Layout view="about" />
            </>
          )}
        />
        <Route
          path="/work/"
          render={() => (
            <>
              <Head title="Work" />
              <Layout view="work" />
            </>
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <>
              <Head />
              <Layout view="root" />
            </>
          )}
        />
        <Route
          path="/"
          render={() => (
            <>
              <Head title="Not Found" />
              <Layout view="root" notFound />
            </>
          )}
        />
      </Switch>
    </BrowserRouter>
  )
}

// Router.propTypes = {}

export default Router
