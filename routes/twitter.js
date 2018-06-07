const router = require("express").Router()

module.exports = (passport) => {

  router.get("/logout", (req, res, next) => {
    console.log("Logging out user " + req.user)
    req.logout()
    res.redirect("/")
  })

  router.get("/twitter", passport.authenticate("twitter"))

  router.get("/twitter/callback",
    passport.authenticate("twitter", {
      failureRedirect: "/auth/twitter/fail",
      successRedirect: "/",
    })
  )

  /* eslint no-unused-vars: 0 */
  router.get("/twitter/fail", (req, res, next) => {
    res.send("<h1>Failed to Log in to Twitter</h1>")
  })

  return router
}
