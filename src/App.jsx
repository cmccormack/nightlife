import React from "react"
import PropTypes from "prop-types"
import { injectGlobal, } from "styled-components"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import blueGrey from "@material-ui/core/colors/blueGrey"
import IconButton from "@material-ui/core/IconButton"
import AccountCircle from "@material-ui/icons/AccountCircle"
import withStyles from "@material-ui/core/styles/withStyles"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faFacebookF from "@fortawesome/fontawesome-free-brands/faTwitter"
import faTwitter from "@fortawesome/fontawesome-free-brands/faFacebookF"
import faLinkedinIn from "@fortawesome/fontawesome-free-brands/faLinkedinIn"
import faGithubAlt from "@fortawesome/fontawesome-free-brands/faGithubAlt"

import theme from "./theme"
import { Header, Footer, } from "./views/layout"
import Typography from "@material-ui/core/Typography"


injectGlobal`
  body {
    background-color: ${blueGrey[100]};
  }
`

const styles = {
  body: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  },
  main: {
    flex: "1 0 auto",
  },
  textLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}

const globalOptions = {
  footer: {
    socialIcons: [
      {
        href: "https://www.facebook.com/christopher.j.mccormack",
        icon: faFacebookF,
      },
      {
        href: "https://twitter.com/chrisjmccormack",
        icon: faTwitter,
      },
      {
        href: "https://github.com/cmccormack",
        icon: faGithubAlt,
      },
      {
        href: "https://www.linkedin.com/in/christopherjmccormack",
        icon: faLinkedinIn,
      },
    ],
  },
}

class App extends React.Component {

  state = {
    text: "Page not loaded...",
  }

  componentDidMount() {
    this.setState({
      text: "Page Loaded!",
    })
  }


  render() {
    const { classes, } = this.props

    return (
      <MuiThemeProvider theme={ theme }>
        <div className={classes.body}>
          <Header
            title="Meet Up Tonight"
            items={[
              <IconButton
                color="inherit"
                key="login"
              >
                <AccountCircle />
              </IconButton>,
            ]}
          />
          <main className={classes.main}>
            <h1>{this.state.text}</h1>
          </main>
          <Footer
            items={globalOptions.footer.socialIcons.map(item => (
              <IconButton
                href={item.href}
                key={ item.icon.iconName }
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={ item.icon }
                />
              </IconButton>
            ))}
          >
            <Typography
              variant="body1"
            >
              {"Created by "}
              <a
                className={classes.textLink}
                href="https://mackville.net"
                rel="noopener noreferrer"
                target="_blank"
              >
                {"Christopher McCormack"}
              </a>
            </Typography>
          </Footer>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)