import React from "react"
import ReactDOM from "react-dom"
import queryString from "query-string"

import App from "./App"
import "./images/favicon.ico"
import { AppProvider, } from "./views/contexts/AppContext"

const queryLocation = queryString.parse(location.search).location

ReactDOM.render(
  <AppProvider location={queryLocation}>
    <App/>
  </AppProvider>,
  document.getElementById("root")
)