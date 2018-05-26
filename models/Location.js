const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
  _id: {type: String, required: true, },
  name: {type: String, required: true, },
  going: Number,
})

const Location = mongoose.model("Location", locationSchema, "locations")

module.exports = Location