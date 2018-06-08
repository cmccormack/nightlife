import React, { Component, } from "react"
import PropTypes from "prop-types"
import IconButton from "@material-ui/core/IconButton"
import queryString from "query-string"

import { AppConsumer, } from "../../contexts/AppContext"
import HeaderForm from "./HeaderForm"
import AccountCircle from "@material-ui/icons/AccountCircle"

class HeaderContainer extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    query: PropTypes.object,
  }

  static defaultProps = {
    query: {},
  }

  render() {

    const title="Meet Up Tonight"

    const { loggedIn, query, } = this.props
    const items = (

      !loggedIn
        ? [
          <IconButton
            color="inherit"
            href={`/auth/twitter?${queryString.stringify(query)}`}
            key="login"
          >
            <AccountCircle />
          </IconButton>,
        ]
        : [
          <a href="/auth/logout" key="logout">Log Out</a>,
        ]
    )
    
    return (
      <HeaderForm
        title={title}
        items={items}
        {...this.props}
      />
    )
  }
}



const HeadercontainerWithAppConsumer = props => (
  <AppConsumer>
    {
      (app) => <HeaderContainer {...props} {...app} />
    }
  </AppConsumer>
)

export default HeadercontainerWithAppConsumer