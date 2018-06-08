const router = require("express").Router()

module.exports = (passport) => {

  router.get("/logout", (req, res, next) => {
    req.logout()
    // res.json({ success: !req.isAuthenticated(), })
    res.redirect("/")
  })

  router.get("/twitter", (req, res, next) => {
    const { location="", } = req.query
    passport.authenticate("twitter", {
      callbackURL: `/auth/twitter/callback?location=${location}`,
    })(req, res, next)
  })

  router.get("/twitter/callback", (req, res, next) => {
    const { location="", } = req.query
    passport.authenticate("twitter", {
      failureRedirect: "/auth/twitter/fail",
      successRedirect: `/?location=${location}`,
    })(req, res, next)

  })

  /* eslint no-unused-vars: 0 */
  router.get("/twitter/fail", (req, res, next) => {
    res.send("<h1>Failed to Log in to Twitter</h1>")
  })

  return router
}
