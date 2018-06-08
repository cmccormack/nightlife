const router = require("express").Router()
const queryString = require("query-string")

module.exports = (passport) => {

  router.get("/logout", (req, res) => {
    req.logout()
    // res.json({ success: !req.isAuthenticated(), })
    res.redirect("/")
  })

  
  router.get("/twitter", (req, res, next) => {
    passport.authenticate("twitter", {
      callbackURL: `/auth/twitter/callback?${queryString.stringify(req.query)}`,
    })(req, res, next)
  })


  router.get("/twitter/callback", (req, res, next) => {
    
    passport.authenticate("twitter", {
      failureRedirect: "./fail",
      successRedirect: `./success?${queryString.stringify(req.query)}`,
    })(req, res, next)
    
  })

  router.get("/twitter/success", (req, res) => {
    const query = queryString.stringify({location: req.query.location,})
    res.redirect(`/?${query}`)
  })

  router.get("/twitter/fail", (req, res) => {
    res.send("<h1>Failed to Log in to Twitter</h1>")
  })

  return router
}
