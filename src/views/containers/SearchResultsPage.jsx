import React from "react"

import SearchResultsForm from "../components/SearchResultsForm"

export default class SearchResultsPage extends React.Component {

  render() {
    return(
      <SearchResultsForm { ...this.props }>
      
      </SearchResultsForm>
    )
  }

}

