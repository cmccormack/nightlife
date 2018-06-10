const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
  id: {type: String, required: true, },
  alias: {type: String, },
  going: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },],
})

locationSchema.methods.goingCount = function() {
  console.log("location.going.length: " + this.going.length)
  return this.going.length
}

const Location = mongoose.model("Location", locationSchema, "locations")

module.exports = Location