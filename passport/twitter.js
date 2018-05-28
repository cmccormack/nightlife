const path = require("path")
const passport = require("passport")
const TwitterStrategy = require("passport-twitter").Strategy
require("dotenv").config({ path: path.resolve(__dirname, "../.env"), })

const { twitter_api_key, twitter_secret, } = process.env

module.exports = () => {
  
  passport.use("twitter", new TwitterStrategy(
    {
      consumerKey: twitter_api_key,
      consumerSecret: twitter_secret,
      callbackURL: "http://127.0.0.1:3000",
    },
    function (token, tokenSecret, profile, done) {
    
      console.info("token: " + token)
      console.table(profile)
      done(null)
      // User.findOrCreate(..., function (err, user) {
      //   if (err) { return done(err); }
      //   done(null, user);
      // });
    }
  ))

}