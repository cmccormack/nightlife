import React, { Component, } from "react"
import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { withStyles, } from "@material-ui/core/styles"

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    textAlign: "center",
  },
}

class Footer extends Component {

  render() {
    const { children, classes, items, } = this.props
    
    return (
      <header>
        <div className={ classes.root }>
          <AppBar position="static">
            <Toolbar>
              <span className={classes.flex}>
                { items }
              </span>
              <Typography
                className={ classes.flex }
                color="inherit"
                variant="title"
              >
                { children }
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </header>
    )
  }
}

Footer.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.object,
  items: PropTypes.array,
}

Footer.defaultProps = {
  classes: {
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
  },
  items: [],
  title: "Title",
}
export default withStyles(styles)(Footer)