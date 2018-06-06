const router = require("express").Router()

module.exports = (passport) => {

  router.get("/twitter", passport.authenticate("twitter"))

  router.get("/twitter/callback",
    passport.authenticate("twitter", {
      failureRedirect: "/auth/twitter/fail",
      successRedirect: "/",
    })
  )

  router.get("/twitter/fail", (req, res, next) => {
    res.send("<h1>Failed to Log in to Twitter</h1>")
  })

  return router
}
