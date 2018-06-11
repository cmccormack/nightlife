import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ThumbUp from "@material-ui/icons/ThumbUp"
import Star from "@material-ui/icons/Star"
import LocationOn from "@material-ui/icons/LocationOn"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import withStyles from "@material-ui/core/styles/withStyles"
import cx from "classnames"

import SearchResult from './SearchResult'

const styles = theme => ({
  default_display: { 
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    textAlign: "center",
    padding: "1.2rem",
  },
  title: {
    paddingBottom: "1.2rem",
  },
})


class SearchResultsForm extends React.Component {

  static propTypes = {
    classes: PropTypes.object,
  }

  render() {

    const { classes, searchResults, ...rest } = this.props

    const displayDefault = (
      <Grid container direction="row" className={classes.default_display}>
        <Typography variant="display1" className={classes.title}>
          {"Welcome to Meet Up Tonight!"}
        </Typography>
        <Typography variant="subheading">
          {"Enter your location above or let us automatically find you!"}
        </Typography>
      </Grid>
    )

    const displayResults = (
      <Grid container direction="row">
        <Grid item xs={12} className={classes.paper}>
          <Typography varient="subheading">
        Search Results
          </Typography>
        </Grid>
        {
          searchResults.map(result => {
            return (
              <SearchResult
                {...result}
                {...rest}
              />
            )
          })
        }
      </Grid>
    )

    return (

      searchResults.length > 0
        ? displayResults
        : displayDefault

    )
  }
}

export default withStyles(styles)(SearchResultsForm)