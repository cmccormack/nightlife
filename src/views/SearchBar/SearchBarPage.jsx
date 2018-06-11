import React from "react"

import { AppConsumer, } from "../contexts/AppContext"
import SearchBarForm from "./SearchBarForm"

export default class SearchBarPage extends React.Component {

  render() {

    return (
      <AppConsumer>
        {
          (app) => <SearchBarForm {...this.props} {...app}/>
        }
      </AppConsumer>
    )
  }
}
