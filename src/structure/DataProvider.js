import React, { useState, useEffect, createContext, useContext } from 'react'
import PrismicRequest from 'data/PrismicRequest'
import APP_DATA from 'data/APP_DATA'

const AppDataCtx = createContext()

function useFetchData(shouldFetch, ctx) {
  const [siteData, setSiteData] = useState()

  useEffect(() => {
    if (shouldFetch) {
      const prismic = new PrismicRequest({ context: ctx })

      prismic.init().then(async () => {
        const allCaseStudies = await prismic.getAllCaseStudies()
        const ctxCaseStudies = prismic.filterCtxCaseStudies(allCaseStudies)
        const contextUids = await prismic.getCtxUids()

        setSiteData({ ctxCaseStudies, allCaseStudies, contextUids })
      })
    }
  }, [ctx, shouldFetch])

  return { ...siteData }
}

function DataProvider({ children }) {
  const SHOULD_FETCH = false

  const staticData = APP_DATA
  const fetchedData = useFetchData(SHOULD_FETCH, 'home')

  return (
    <AppDataCtx.Provider
      value={{
        loaded: SHOULD_FETCH ? !!fetchedData.allCaseStudies : true,
        ctxCaseStudies: SHOULD_FETCH
          ? fetchedData.ctxCaseStudies
          : staticData.ctxCaseStudies,

        // Always fetch `allCaseStudies`
        allCaseStudies: fetchedData.allCaseStudies,
      }}
    >
      {children}
    </AppDataCtx.Provider>
  )
}

export const useData = () => useContext(AppDataCtx)

export default DataProvider
