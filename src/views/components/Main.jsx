import React from "react"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import withStyles from "@material-ui/core/styles/withStyles"
import cx from "classNames"

const styles = theme => ({
  root: {
    flex: "1 0 auto",
    "max-width": "1024px",
    margin: "20px auto",
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
})

class Main extends React.Component {

  render() {

    const { children, classes, } = this.props
    return (
      <main className={ classes.root }>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={ classes.paper }>
              { children }
            </Paper>
          </Grid>
        </Grid>
      </main>
    )
  }
}

export default withStyles(styles)(Main)