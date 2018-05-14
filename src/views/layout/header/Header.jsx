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
  },
}

class Header extends Component {

  render() {
    const { classes, title, items, } = this.props
    
    return (
      <header>
        <div className={ classes.root }>
          <AppBar position="static">
            <Toolbar>
              <Typography
                className={ classes.flex }
                color="inherit"
                variant="title"
              >
                { title }
              </Typography>
              { items.map(item => (
                item
              ))}
            </Toolbar>
          </AppBar>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.object,
  items: PropTypes.array,
}

Header.defaultProps = {
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
export default withStyles(styles)(Header)