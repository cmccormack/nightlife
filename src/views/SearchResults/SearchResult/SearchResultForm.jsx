import React from "react"
import cx from "classnames"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ThumbUp from "@material-ui/icons/ThumbUp"
import Star from "@material-ui/icons/Star"
import StarHalf from "@material-ui/icons/StarHalf"
import LocationOn from "@material-ui/icons/LocationOn"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import withStyles from "@material-ui/core/styles/withStyles"


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
  },
  gobutton: {
    borderColor: theme.palette.secondary.light,
    backgroundColor: "#aa614a",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  gobuttondisabled: {

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

  margin: {
    margin: theme.spacing.unit * 2,
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

class SearchResultForm extends React.Component {

  render() {

    // const ITEM_HEIGHT = 48

    // const placeholderImage = "/images/placeholder.jpg"

    // const userGoing = going.map(({_id,}) => _id).includes(user._id) || false
    // const usersGoing = going.map(user => user.twitter.displayName)

    return (
      <h1>{'blah'}</h1>
    )
  }
}


      /*
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
              <em>{buildDescription(categories)}</em>
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
              Array(~~rating).fill("").map((v,i) => (
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
                className={cx(classes.button, classes.goingbutton)}
                disabled={going.length === 0}
                onClick={this.handleOpenMenu}
                variant="outlined"
              >
                <Typography variant="button">
                  {`${going.length} ${going.length === 1 ? "Person" : "People"} Going`}
                </Typography>
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={this.handleCloseMenu}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                  },
                }}
              >
                {
                  usersGoing.length > 0 && usersGoing.map(user => {
                    return(
                      <MenuItem
                        key={user}
                        onClick={this.handleCloseMenu}
                      >
                        {user}
                      </MenuItem>
                    )})
                }
              </Menu>
            </div>
            <Tooltip
              title={ !loggedIn
                ? "You must be logged in to perform that action"
                : ""
              }
              placement="left-start"
            >
              <div className={classes.buttonWrapper}>
                <Button
                  className={
                    cx(classes.button, {[classes.gobutton]: loggedIn,} )
                  }
                  disabled={!loggedIn}
                  onClick={handleGoingClick}
                  variant="outlined"
                >
                  {userGoing ? "I'm Going!" : "I Want To Go!"}
                  <ThumbUp
                    className={cx(classes.rightIcon, classes.iconSmall)}
                  >
                    {"thumbs_up"}
                  </ThumbUp>
                </Button>
              </div>
            </Tooltip>
          </div>
        </Card>
      </Grid>
    )
  }
}
*/
export default withStyles(styles)(SearchResultForm)