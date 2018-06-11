import React from "react"
import PropTypes from "prop-types"

import queryString from "query-string"

const AppContext = React.createContext("app")

export const AppConsumer = AppContext.Consumer
export class AppProvider extends React.Component {

  state = {
    loggedIn: false,
    locationFound: false,
    location: this.props.query.location,
    placeholder: "Enter your location",
    searchResults: [],
    query: this.props.query,
    user: {_id: null, twitter: {},},
  }

  static propTypes = {
    children: PropTypes.any,
    query: PropTypes.object,
  }

  static defaultProps = {
    location: "",
    query: { 
      location: "",
      term: "nightlife",
    },
  }

  async componentDidMount() {
    this.fetchSearchResults()
    this.getUserDetails()
  }


  fetchJSON = (path, options) => {
    return fetch(
      path,
      {
        method: "GET",
        credentials: "include",
        ...options,
      }
    ).then(res => res.json())
  }


  fetchSearchResults = async (params=this.state.query, updateLocation=true) => {

    if (!params["location"]) {
      if (!(params["latitude"] && params["longitude"])) {
        return
      }
    }

    const updateState = ({
      locationFound,
      location="",
      placeholder="",
      query={},
      ...rest
    }) => {
      this.setState(prevState => ({
        location: updateLocation ? location : prevState.location,
        locationFound: locationFound || prevState.locationFound,
        query: Object.assign(query, prevState.query),
        placeholder,
        ...rest,
      }))
    }

    const searchUrl = `/api/search?${queryString.stringify(params)}`

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
      await updateState({
        location: `${city}, ${state}`,
        searchResults: response.jsonBody.businesses,
        query: {location: `${city},+${state}`, },
      })
      
      // Add the location to the query parameters
      const { query, } = this.state
      history.pushState({}, null, `/?${queryString.stringify(query)}`)
      
      await this.updateResultsFromDb()

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

    const { location, query: {term, },} = this.state
    this.fetchSearchResults({ location, term, })

  }


  handleGeolocate = async e => {
    e.preventDefault()

    const handleSuccess = ({ coords: { latitude, longitude, },}) => {

      this.setState(prevState => ({
        locationFound: true,
        query: Object.assign({
          latitude: latitude.toFixed(2),
          longitude: longitude.toFixed(2),
        }, prevState.query),
      }), this.fetchSearchResults)
      
    }

    const handleFailure = error => {
      console.error(error)
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleFailure)
  }


  // Check server to see if user is authenticated
  handleValidateAuth = async () => {
    const {isauth,} = await this.fetchJSON("/isauth")

    this.setState({
      loggedIn: isauth,
    })

    return isauth
  }

  getUserDetails = async () => {

    if (!this.state.loggedIn) return

    const user = await this.fetchJSON("/user")
    this.setState({ user, })

    return user
  }

  buildDescription = (categories) => categories.map(c => c.title).join(", ")

  handleGoing = async (location) => {
    await this.fetchJSON("/api/app/going", {
      method: "POST",
      body: JSON.stringify({location,}),
      headers: { "Content-Type": "application/json", },
    })
    this.updateResultsFromDb()
  }

  updateResultsFromDb = async () => {
    const { searchResults, } = this.state
    const resultIds = searchResults.map(v => v.id)
    const {updates,} = await this.fetchJSON("/api/app/updatedresults", {
      method: "POST",
      body: JSON.stringify({ resultIds, }),
      headers: { "Content-Type": "application/json", },
    })

    const updateIds = updates.map(v=>v.id)

    const updatedResults = searchResults.map(result => {
      const resultIndex = updateIds.indexOf(result.id)
      if (resultIndex !== -1) {
        return Object.assign(result, { going: updates[resultIndex].going,})
      }
      return Object.assign(result, { going: [], })
    })
    this.setState({ searchResults: updatedResults, })
  }


  render() {

    return (
      <AppContext.Provider
        value={{
          ...this.state,
          buildDescription: this.buildDescription,
          getUserDetails: this.getUserDetails,
          handleGeolocate: this.handleGeolocate,
          handleGoing: this.handleGoing,
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
          ({ loggedIn, handleValidateAuth, getUserDetails, }) => (
            <Component
              loggedIn={loggedIn}
              handleValidateAuth={handleValidateAuth}
              getUserDetails={getUserDetails}
              {...props}
            />
          )
        }
      </AppConsumer>
    )
  }
}