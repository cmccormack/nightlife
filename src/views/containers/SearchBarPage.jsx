import React from "react"

import SearchBarForm from "../components/SearchBarForm"

export default class SearchBarPage extends React.Component {

  render() {

    return (
      <SearchBarForm {...this.props}>
      </SearchBarForm>
    )
  }
}
