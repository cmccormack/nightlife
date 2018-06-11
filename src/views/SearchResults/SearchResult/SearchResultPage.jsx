import React from "react"

import SearchResultForm from "./SearchResultForm"

export default class SearchResultPage extends React.Component {

  state = {
    anchorEl: null,
  }

  handleGoingClick = () => {
    const { loggedIn, handleGoing, } = this.props
    const location = { alias, id, }
    loggedIn && handleGoing(location)
  }

  handleOpenMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget, })
  }
  handleCloseMenu = () => {
    this.setState({ anchorEl: null, })
  }

  render() {

    return(
      <SearchResultForm
        {...this.state}
        {...this.props}
        handleOpenMenu={this.handleOpenMenu}
        handleCloseMenu={this.handleCloseMenu}
        handleGoingClick={this.handleGoingClick}
      />
    )
  }
}