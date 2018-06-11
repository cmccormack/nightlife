import React from "react"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import cx from "classnames"

import SearchBar from "../SearchBar"
import SearchResults from "../SearchResults"
console.log(SearchResults)

const styles = theme => ({
  main: {
    flex: "1 0 auto",
    marginTop: "60px",
    justifyContent: "center",
  },
  container: {
    [theme.breakpoints.up("lg")]: {
      width: 1170,
      margin: "auto",
    },
  },
})

class Main extends React.Component {

  render() {

    const { children, classes, } = this.props
    return (
      <main className={ classes.main }>
        <Grid
          className={ classes.container }
          container
          justify="center"
          spacing={24}
        >
          <Grid item xs={12}>
            <SearchBar />
          </Grid>
          <Grid item xs={12}>
            <SearchResults />
          </Grid>
        </Grid>
      </main>
    )
  }
}

export default withStyles(styles)(Main)