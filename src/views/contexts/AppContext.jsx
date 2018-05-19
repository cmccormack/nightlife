import React from "react"
import PropTypes from "prop-types"

const AppContext = React.createContext("app")

export const AppConsumer = AppContext.Consumer
export class AppProvider extends React.Component {

  state = {
    isAuth: false,
    location: "",
  }

  handleLocationChange = e => {
    this.setState({ location: e.target.value, })
  }

  static propTypes = {
    children: PropTypes.any,
  }

  render() {

    return (
      <AppContext.Provider
        value={{
          ...this.state,
          handleLocationChange: this.handleLocationChange,
        }}
      >
        { this.props.children }
      </AppContext.Provider>
    )
  }
}