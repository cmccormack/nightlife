import React from "react"
import PropTypes from "prop-types"
import { injectGlobal, } from "styled-components"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import IconButton from "@material-ui/core/IconButton"
import AccountCircle from "@material-ui/icons/AccountCircle"
import withStyles from "@material-ui/core/styles/withStyles"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faFacebookF from "@fortawesome/fontawesome-free-brands/faTwitter"
import faTwitter from "@fortawesome/fontawesome-free-brands/faFacebookF"
import faLinkedinIn from "@fortawesome/fontawesome-free-brands/faLinkedinIn"
import faGithubAlt from "@fortawesome/fontawesome-free-brands/faGithubAlt"

import { AppProvider, } from "./views/contexts/AppContext"
import theme from "./theme"
import { Header, Footer, } from "./views/layout"
import Main from "./views/components/Main"
import Typography from "@material-ui/core/Typography"


injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`

const styles = {
  body: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
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

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.setState({
      text: "Page Loaded!",
    })
  }


  render() {
    const { classes, } = this.props
    console.log(theme)
    return (
      <AppProvider>
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
            <Main
              className={ classes.main }
            >
              {/* Some stuff for main later  */}
            </Main>
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
      </AppProvider>
    )
  }
}

export default withStyles(styles)(App)