const path = require("path")
const passport = require("passport")
const TwitterStrategy = require("passport-twitter").Strategy
require("dotenv").config({ path: path.resolve(__dirname, "../.env"), })

const User = require("../models/User")

const { twitter_api_key, twitter_secret, } = process.env

module.exports = () => {
  
  passport.use("twitter", new TwitterStrategy(
    {
      consumerKey: twitter_api_key,
      consumerSecret: twitter_secret,
      callbackURL: "http://127.0.0.1:3000/auth/twitter/callback",
    },
    (token, tokenSecret, profile, done) => {

      const { id, username, displayName, } = profile

      User.findOne({ "twitter.id": id, }).exec((err, user) => {

        if (err) return done(err)

        if (user) return done(null, user)

        const newUser = new User({
          twitter: {
            id,
            token,
            displayName,
            username,
          },
        })

        newUser.save(err => {

          if (err) return done(err)

          console.info(`User ${username} added to database!`)

          return done(null, newUser, {
            message: `User ${username} added to database!`,
          })
        })

      })
    }
  ))

}