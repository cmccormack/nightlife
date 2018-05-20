import React from "react"
import PropTypes from "prop-types"

const AppContext = React.createContext("app")

export const AppConsumer = AppContext.Consumer
export class AppProvider extends React.Component {

  state = {
    isAuth: false,
    locationFound: false,
    location: "",
    term: "night life",
  }

  fetchSearchResults = params => {
    const esc = encodeURIComponent
    const query = Object.keys(params)
      .map(k => esc(k) + "=" + esc(params[k]))
      .join("&")

    console.log(query)
    fetch(`/api/search?${query}`)
      .then(res => res.json())
      .then(({response,}) => {
        const { city, state, } = response.jsonBody.businesses[0].location
        this.setState({location: `${city}, ${state}`,})
      }).catch(console.error)
  }

  handleLocationChange = e => {
    this.setState({ location: e.target.value, })
  }

  handleLocationFormSubmit = e => {
    e.preventDefault()

    const { location, term, } = this.state
    this.fetchSearchResults({ location, term, })

  }

  handleGeolocate = e => {
    e.preventDefault()
    const { term, } = this.state

    const handleSuccess = ({ coords: { latitude: lat, longitude: lon, },}) => {
      const location = `${lat}, ${lon}`
      this.setState({
        location,
        locationFound: true,
      })
      this.fetchSearchResults({ location, term,})
    }

    const handleFailure = error => {
      console.error(error)
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleFailure)
  }

  handleRequestLocation = () => {
    this.setState({ locationFound: true, })
  }

  static propTypes = {
    children: PropTypes.any,
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