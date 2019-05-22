import "styles/reset.scss";
import "styles/fonts.scss";
import "styles/typography.scss";
import "styles/layout.scss";

import React, { createContext } from "react";
import Router from "../Router/Router";
import useApi from "./useApi";
import "./App.scss";

export const ApiDataCtx = createContext();

function App() {
  const data = useApi();

  if (data) {
    return (
      <ApiDataCtx.Provider value={data}>
        <Router />
      </ApiDataCtx.Provider>
    );
  }
  return <div>Loading</div>;
}

export default React.memo(App);
