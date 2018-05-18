import React from "react"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"


const styles = theme => ({
  searchBar: {

  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
})

class SearchBarForm extends React.Component {

  render() {

    const { children, classes, } = this.props

    return (
      <Grid
        className={ classes.searchBar } 
        item xs={12}
      >
        <Paper className={ classes.paper }>
          <Typography variant="body2">
            { children }
            some text
          </Typography>
        </Paper>
      </Grid>
    )
  }
}

export default withStyles(styles)(SearchBarForm)