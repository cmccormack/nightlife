import React, { Component, } from "react"
import PropTypes from "prop-types"
import IconButton from "@material-ui/core/IconButton"

import { AppConsumer, } from "../../contexts/AppContext"
import HeaderForm from "./HeaderForm"
import AccountCircle from "@material-ui/icons/AccountCircle"

class HeaderContainer extends Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  }

  render() {

    const title="Meet Up Tonight"

    const items = (

      !this.props.loggedIn
        ? [
          <IconButton
            color="inherit"
            href="/auth/twitter"
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