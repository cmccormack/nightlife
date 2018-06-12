import React from "react"

import { AppConsumer, } from "../contexts/AppContext"
import SearchBarForm from "./SearchBarForm"

class SearchBarPage extends React.Component {

  state = {
    loading: false,
  }

  handleGeolocate = async (e) => {
    e.preventDefault()
    this.setState({loading: true})
    await this.props.handleGeolocate()
    this.setState({loading: false})
  }

  render() {

    const { handleGeolocate, ...props } = this.props
    return (

      <SearchBarForm
        {...this.state}
        {...props}
        handleGeolocate={this.handleGeolocate} 
      />
    )
  }
}

const withApp = function(Component) {
  return function SearchBarPageWithApp(props) {
    return (
      <AppConsumer>
        {
          (app) => <Component {...props} {...app} />
        }
      </AppConsumer>
    )
  }
}

export default withApp(SearchBarPage)