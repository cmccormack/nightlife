import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import withStyles from "@material-ui/core/styles/withStyles"
import cx from "classnames"

import { AppConsumer, } from "../contexts/AppContext"

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

const {
  categories,
  image_url,
  url,
  rating,
  name,
} = test[0]


const styles = theme => ({
  card: { 
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#555",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  content: {
    flex: "1 0 auto",
    order: 1,
  },
  buttonWrapper: {
    display: "flex",
    flex: "1 0 auto",
    padding: ".4rem",
  },
  button: {
    flex: "1 0 auto",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    width: 200,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      width: "100%",
      height: 40,
    },
    order: 2,
  },
  media: {
    flex: "0 1 auto",
    width: 250,
    height: 120,
    order: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingTop: "10%",
    },
  },
  paper: {
    flex: "1 0 auto",
    padding: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  headline: {
    fontWeight: theme.typography.fontWeightLight,
    textAlign: "center",
  },
  textField: {
    flexBasis: 450,
  },
})


class SearchResultsForm extends React.Component {

  static propTypes = {
    classes: PropTypes.object,
  }

  render() {

    const { classes, } = this.props
    return (
      <AppConsumer>
        {({
          searchResults,
        }) => (
          <Paper className={classes.paper}>
            <Grid container direction="row">
              <Grid item xs={12} className={classes.paper}>
                <Typography varient="subheading">
              Search Results
                </Typography>
              </Grid>
              {
                test.map(({
                // searchResults.map(({
                  categories,
                  id,
                  image_url,
                  name,
                  rating,
                }) => {
                  const description = categories.map(c => c.title).join(", ")
                  return (
                    <Grid item xs={12} key={id}>
                      <Card
                        className={cx(classes.margin, classes.card)}
                        elevation={1}
                      >
                        <CardMedia
                          className={classes.media}
                          image={image_url}
                          title={name}
                        />
                        <CardContent className={classes.content}>
                          <Typography variant="title">
                            {name}
                          </Typography>
                          <Typography variant="body1">
                            {description}
                          </Typography>
                          <Typography variant="caption">
                            Rating: {rating}
                          </Typography>
                  
                        </CardContent>
                        <div className={classes.buttons}>
                          <div className={classes.buttonWrapper}>
                            <Button
                              className={classes.button}
                              disabled
                              variant="outlined"
                            >
                              <Typography variant="button">
                                {"0 People Going"}
                              </Typography>
                            </Button>
                          </div>
                          <div className={classes.buttonWrapper}>
                            <Button
                              className={classes.button}
                              variant="outlined"
                            >
                              <Typography variant="button">
                                {"I Want To Go!"}
                              </Typography>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Paper>
        )}
      </AppConsumer>
    )
  }
}

export default withStyles(styles)(SearchResultsForm)