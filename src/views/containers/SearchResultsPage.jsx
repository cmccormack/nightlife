import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import withStyles from "@material-ui/core/styles/withStyles"

import { AppConsumer, } from "../contexts/AppContext"
import SearchResultsForm from "../components/SearchResultsForm"
import SearchResultsSuccess from "../components/SearchResultsSuccess"

const test = [{
  "id": "mUHBDJr4ZIK3m6k6j5EsJw",
  "alias": "nfuse-restaurant-bar-and-lounge-anaheim",
  "name": "nFuse Restaurant, Bar & Lounge",
  "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/tMFBGGNjnwwKrvuxqjfAPg/o.jpg",
  "is_closed": false,
  "url": "https://www.yelp.com/biz/nfuse-restaurant-bar-and-lounge-anaheim?adjust_creative=5puTWCmdaC4To8-a0L_njQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5puTWCmdaC4To8-a0L_njQ",
  "review_count": 197,
  "categories": [
    {
      "alias": "newamerican",
      "title": "American (New)",
    },
    {
      "alias": "lounges",
      "title": "Lounges",
    },
    {
      "alias": "beer_and_wine",
      "title": "Beer, Wine & Spirits",
    },
  ],
  "rating": 4,
  "coordinates": {
    "latitude": 33.79874,
    "longitude": -117.91825,
  },
  "transactions": [],
  "price": "$$",
  "location": {
    "address1": "700 West Convention Way",
    "address2": null,
    "address3": null,
    "city": "Anaheim",
    "zip_code": "92802",
    "country": "US",
    "state": "CA",
    "display_address": [
      "700 West Convention Way",
      "Anaheim, CA 92802",
    ],
  },
  "phone": "+17147508000",
  "display_phone": "(714) 750-8000",
  "distance": 108.52472513720672,
},]



const styles = theme => ({
  paper: {
    flex: "1 0 auto",
    flexDirection: "column",
    padding: theme.spacing.unit * 5,
    marginBottom: 60,
  },
})


class SearchResultsPage extends React.Component {

  static propTypes = {
    classes: PropTypes.object,
  }

  render() {

    const { classes, } = this.props
    return(
      <AppConsumer>
        {(app) => (
          <Paper className={classes.paper}>
            {
              app.searchResults.length > 0
                ? <SearchResultsSuccess
                  {...app}
                />
                : <SearchResultsForm />
            }
          </Paper>
        )}
      </AppConsumer>
    )
  }

}

export default withStyles(styles)(SearchResultsPage)