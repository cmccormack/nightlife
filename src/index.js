import React from "react"
import ReactDOM from "react-dom"
import queryString from "query-string"

import App from "./App"
import "./images/favicon.ico"
import { AppProvider, } from "./views/contexts/AppContext"

const query = !!location.search && queryString.parse(location.search)

ReactDOM.render(
  <AppProvider query={query}>
    <App/>
  </AppProvider>,
  document.getElementById("root")
)