import React, { useState, useEffect, createContext, useContext } from 'react'
import getPrismicData from 'util/getPrismicData'

const AppDataCtx = createContext()

function DataProvider({ children }) {
  const [siteData, setSiteData] = useState()

  useEffect(() => {
    getPrismicData().then(res => setSiteData(res))
  }, [])

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
