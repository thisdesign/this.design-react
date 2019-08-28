import React, { useState, useEffect, createContext, useContext } from 'react'
import getPrismicData from 'util/getPrismicData'

const AppDataCtx = createContext()

function useFetchData(cond = true) {
  const [siteData, setSiteData] = useState()

  useEffect(() => {
    if (cond) getPrismicData().then(res => setSiteData(res))
  }, [cond])

  return siteData
}

function DataProvider({ children }) {
  const SHOULD_FETCH = true
  const fetchedData = useFetchData(SHOULD_FETCH)
  const siteData = SHOULD_FETCH ? fetchedData : null

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
