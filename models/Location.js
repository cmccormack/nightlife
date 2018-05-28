const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
  _id: {type: String, required: true, },
  name: {type: String, required: true, },
  going: {type: Number, required: true, },
})

const Location = mongoose.model("Location", locationSchema, "locations")

module.exports = Location