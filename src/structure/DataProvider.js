import React, { useState, useEffect, createContext, useContext } from 'react'
import getPrismicData from 'data/getPrismicData'
import APP_DATA from 'data/APP_DATA'

const AppDataCtx = createContext()

function useFetchData(shouldFetch = true) {
  const [siteData, setSiteData] = useState()

  useEffect(() => {
    if (shouldFetch) getPrismicData().then(res => setSiteData(res))
  }, [shouldFetch])

  return siteData
}

function DataProvider({ children }) {
  const SHOULD_FETCH = false

  const staticDta = APP_DATA.data
  const fetchedData = useFetchData(SHOULD_FETCH)

  const siteData = SHOULD_FETCH ? fetchedData : staticDta

  return (
    <AppDataCtx.Provider
      value={{
        loaded: !!siteData,
        ...siteData,
      }}
    >
      {children}
    </AppDataCtx.Provider>
  )
}

export const useData = () => useContext(AppDataCtx)

export default DataProvider
