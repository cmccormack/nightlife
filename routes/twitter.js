const router = require("express").Router()
const queryString = require("query-string")


module.exports = (passport) => {


  router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
  })

  // Route to authenticate via Twitter API
  router.get("/twitter", (req, res, next) => {
    passport.authenticate("twitter", {
      callbackURL: `/auth/twitter/callback?${queryString.stringify(req.query)}`,
    })(req, res, next)
  })

  // Route called by Twitter response
  router.get("/twitter/callback", (req, res, next) => {
    
    passport.authenticate("twitter", {
      failureRedirect: "./fail",
      successRedirect: `./success?${queryString.stringify(req.query)}`,
    })(req, res, next)
    
  })

  // Twitter response successful
  router.get("/twitter/success", (req, res) => {

    const query = {...req.query,}
    // Remove unnecessary keys from the query object
    delete query.oauth_verifier
    delete query.oauth_token
    res.redirect(`/?${queryString.stringify(query)}`)
  })

  // Twitter response failed
  router.get("/twitter/fail", (req, res) => {
    res.send("<h1>Failed to Log in via Twitter</h1>")
  })


  return router
}
