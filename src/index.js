import React from "react"
import ReactDOM from "react-dom"

import App from "./App"
import "./images/favicon.ico"
import { AppProvider, } from "./views/contexts/AppContext"

ReactDOM.render(
  <AppProvider>
    <App/>
  </AppProvider>,
  document.getElementById("root")
)