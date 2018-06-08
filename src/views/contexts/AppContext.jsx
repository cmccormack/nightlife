import React from "react"
import PropTypes from "prop-types"

import { toQueryString, } from "../../utils/queryparams"

const AppContext = React.createContext("app")

export const AppConsumer = AppContext.Consumer
export class AppProvider extends React.Component {

  state = {
    loggedIn: false,
    locationFound: false,
    location: this.props.location,
    placeholder: "Enter your location",
    searchResults: [],
    term: "nightlife",
  }

  static propTypes = {
    children: PropTypes.any,
    location: PropTypes.string,
  }

  static defaultProps = {
    location: "",
  }

  componentDidMount() {
    
    const { location, term, } = this.state
    this.state.location && this.fetchSearchResults({location, term,})
  }


  fetchJSON = (path, method="GET") => {
    return fetch(
      path,
      {
        method,
        credentials: "include",
      }
    ).then(res => res.json())
  }


  fetchSearchResults = async (params, updateLocation=true) => {

    const updateState = ({
      locationFound,
      location="",
      placeholder="",
      ...rest
    }) => {
      this.setState(prevState => ({
        location: updateLocation ? location : prevState.location,
        locationFound: locationFound || prevState.locationFound,
        placeholder,
        ...rest,
      }))
    }

    const searchUrl = `/api/search?${toQueryString(params)}`

    try {
      const { response, success, } = await this.fetchJSON(searchUrl)

      if (!success) {
        switch(response.error.code) {
          case "LOCATION_NOT_FOUND":
            updateState({placeholder: "Location Not Found",})
        }
        return console.error(response.error.description)
      }

      if (response.jsonBody.businesses.length === 0) {
        return updateState("No Results Found in Your Area")
      }

      const { city, state, } = response.jsonBody.businesses[0].location
      updateState({
        location: `${city}, ${state}`,
        searchResults: response.jsonBody.businesses,
      })

      // Add the location to the query parameters
      history.pushState({}, null, `/?location=${city},+${state}`)

    } catch(error) { console.error }
  }



  handleLocationChange = e => {
    this.setState({
      location: e.target.value,
      placeholder: "Enter your location",
    })
  }


  handleLocationFormSubmit = e => {
    e.preventDefault()

    const { location, term, } = this.state
    this.fetchSearchResults({ location, term, })

  }


  handleGeolocate = e => {
    e.preventDefault()
    const { term, } = this.state

    const handleSuccess = ({ coords: { latitude, longitude, },}) => {
      this.setState({
        locationFound: true,
      })
      this.fetchSearchResults({ latitude, longitude, term,})
    }

    const handleFailure = error => {
      console.error(error)
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleFailure)
  }


  handleValidateAuth = async () => {
    const {isauth,} = await this.fetchJSON("/isauth", "GET")

    this.setState({
      loggedIn: isauth,
    })
  }


  render() {

    return (
      <AppContext.Provider
        value={{
          ...this.state,
          handleGeolocate: this.handleGeolocate,
          handleLocationChange: this.handleLocationChange,
          handleLocationFormSubmit: this.handleLocationFormSubmit,
          handleRequestLocation: this.handleRequestLocation,
          handleValidateAuth: this.handleValidateAuth,
        }}
      >
        { this.props.children }
      </AppContext.Provider>
    )
  }
}


export function withAuth(Component) {
  return function AuthComponent(props) {
    return(
      <AppConsumer>
        {
          ({ loggedIn, handleValidateAuth, }) => (
            <Component
              loggedIn={loggedIn}
              handleValidateAuth={handleValidateAuth}
              {...props}
            />
          )
        }
      </AppConsumer>
    )
  }
}