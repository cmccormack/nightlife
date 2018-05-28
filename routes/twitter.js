const router = require("express").Router()

module.exports = (passport) => {

  router.get("/twitter", passport.authenticate("twitter"))

  router.get("/twitter/callback",
    passport.authenticate("twitter", {
      successRedirect: "/",
      failureRedirect: "/login",
    }))

  return router
}
