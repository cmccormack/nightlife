const router = require("express").Router()

const User = require("../models/User")
const Location = require("../models/Location")

module.exports = () => {
  
  console.debug("WARNING: collection wipe endpoints still configured, remove before moving to production")

  router.get("/wipeusers", (req, res) => {
    User.remove({}, err => {
      if (err) return console.error(err)
      const message = "Successfully wiped 'user' collection"
      console.info(message)
      res.json({success: true, message,})
    })
  })

  router.get("/wipelocations", (req, res) => {
    Location.remove({}, err => {
      if (err) return console.error(err)
      const message = "Successfully wiped 'locations' collection"
      console.info(message)
      res.json({ success: true, message, })
    })
  })

  router.get("/users", (req, res) => {
    User.find({}, (err, docs) => {
      if (err) return console.error(err)
      res.json(docs)
    })
  })

  router.get("/locations", (req, res) => {
    Location.find({}, (err, docs) => {
      if (err) return console.error(err)
      res.json(docs)
    })
  })



  /* Add validator later */
  router.post("/going", async (req, res, next) => {

    if (!req.body) {
      return next(Error("Invalid 'body' received"))
    }

    if (!req.user) {
      return next(Error("Must be logged in to perform this action"))
    }

    const { id:locationId, alias, } = req.body
    const { _id: userId, } = req.user

    try {
      const user = await User.findById(userId)
      if (!user) throw new Error(`No user found matching ID ${userId}`)

      const location = await Location.findOne({id: locationId,}) ||
        await new Location({
          id: locationId,
          alias,
          going: [],
        }).save()

      const locationIndex = user.going.indexOf(location._id)
      const userIndex = location.going.indexOf(user._id)

      console.log(location)
      // Add location to user.going if user is going
      if (locationIndex === -1) {
        user.going.push(location._id)
        location.going.push(user._id)
      } else {
        // Remove location from Models
        user.going = [
          ...user.going.slice(0, locationIndex),
          ...user.going.slice(locationIndex + 1),
        ]

        location.going = [
          ...location.going.slice(0, userIndex),
          ...location.going.slice(userIndex + 1),
        ]
      }
      
      await user.save()
      await location.save()

      // Remove location from DB if no users are going
      if (location.going.length === 0) {
        await Location.deleteOne({_id: location._id,})
      }

    } catch(err) {
      return next(err)
    }

    res.json(req.body)

  })

  return router

}