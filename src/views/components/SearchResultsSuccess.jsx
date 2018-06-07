import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ThumbUp from "@material-ui/icons/ThumbUp"
import Star from "@material-ui/icons/Star"
import StarHalf from "@material-ui/icons/StarHalf"
import LocationOn from "@material-ui/icons/LocationOn"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import withStyles from "@material-ui/core/styles/withStyles"
import cx from "classnames"

import { withAuth, } from "../contexts/AppContext"
import "../../images/placeholder.jpg"


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
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  icons: {
    fontSize: "16px",
    float: "left",
  },
  star: {
    color: "gold",
    fontSize: "16px",
  },
  pin: {
    color: "#dd4c40",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    width: 200,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      width: "100%",
    },
    order: 2,
  },
  button: {
    flex: "1 0 auto",
    margin: theme.spacing.unit,
    border: "2px solid",
    borderColor: theme.palette.secondary.light,
  },
  media: {
    flex: "0 1 auto",
    width: 250,
    order: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingTop: "40%",
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
  textLink: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  titleText: {
    color: theme.palette.secondary.light,
  },
})


const SearchResultsSuccess = ({
  classes,
  loggedIn,
  searchResults,
}) => {

  const placeholderImage = "/images/placeholder.jpg"

  const getMapUrl = (address) => (
    `https://www.google.com/maps/place/${address}`
  )

  return(
    <Grid container direction="row">
      <Grid item xs={12} className={classes.paper}>
        <Typography varient="subheading">
        Search Results
        </Typography>
      </Grid>
              
      {
        searchResults.map(({
          categories,
          id,
          image_url,
          location,
          name,
          rating,
          url,
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
                  image={image_url || placeholderImage}
                  title={name}
                />
                <CardContent className={classes.content}>
                  <Typography variant="title">
                    <a
                      className={cx(classes.textLink, classes.titleText)}
                      href={url}
                      rel="noreferrer noopener"
                      target={"_blank"}
                    >
                      {name}
                    </a>
                  </Typography>
                  <Typography variant="body1">
                    <em>{description}</em>
                  </Typography>
                  <Typography variant="body1">
                    <a 
                      className={classes.textLink}
                      href={getMapUrl(
                        location.display_address.map(
                          _=>_.split(" ").join("+")
                        ).join("+")
                      )}
                      rel="noreferrer noopener"
                      target={"_blank"}
                    >
                      <LocationOn className={cx(classes.icons, classes.pin)}>
                        location_on
                      </LocationOn>
                      {location.display_address.join(" ")}
                    </a>
                  </Typography>
                  {
                    Array(Math.floor(rating)).fill("").map((v,i) => (
                      <Star
                        className={cx(classes.icons, classes.star)}
                        key={i}
                      />
                    ))
                  }
                  {
                    rating % 1 > 0 && (
                      <StarHalf
                        className={cx(classes.icons, classes.star)}
                      />
                    )
                  }

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
                    {console.log("SearchResultsSuccess: loggedIn: " + loggedIn)}
                    <Button
                      className={classes.button}
                      variant="outlined"
                      disabled={!loggedIn}
                    >
                      {"I Want To Go!"}
                      <ThumbUp
                        className={cx(classes.rightIcon, classes.iconSmall)}
                      >
                        {"thumbs_up"}
                      </ThumbUp>
                    </Button>
                  </div>
                </div>
              </Card>
            </Grid>
          )
        })
      }
    </Grid>
  )
}

SearchResultsSuccess.propTypes = {
  classes: PropTypes.object,
  searchResults: PropTypes.array,
}

SearchResultsSuccess.defaultProps = {
  classes: {},
  searchResults: [],
}

export default withStyles(styles)(withAuth(SearchResultsSuccess))