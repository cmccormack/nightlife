import React from "react"
import PropTypes from "prop-types"

import { toQueryString, } from "../../utils/queryparams"

const AppContext = React.createContext("app")

export const AppConsumer = AppContext.Consumer
export class AppProvider extends React.Component {

  state = {
    isAuth: false,
    locationFound: false,
    location: "",
    placeholder: "Enter your location",
    searchResults: [],
    term: "night life",
  }

  static propTypes = {
    children: PropTypes.any,
  }


  fetchSearchResults = (params, updateLocation=true) => {

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

    fetch(`/api/search?${toQueryString(params)}`)
      .then(res => res.json())
      .then(({response, success,}) => {

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
        console.log(response.jsonBody.businesses[0])

      })
      .catch(console.error)
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


  render() {

    return (
      <AppContext.Provider
        value={{
          ...this.state,
          handleGeolocate: this.handleGeolocate,
          handleLocationChange: this.handleLocationChange,
          handleLocationFormSubmit: this.handleLocationFormSubmit,
          handleRequestLocation: this.handleRequestLocation,
        }}
      >
        { this.props.children }
      </AppContext.Provider>
    )
  }
}