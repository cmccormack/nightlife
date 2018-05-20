const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, ".env"), })
const yelp = require("yelp-fusion")

const { yelpKey, } = process.env
const client = yelp.client(yelpKey)

module.exports = app => {

  app.get("/", (req, res) => {
    const { query, } = req
    const { location, term="", } = query


    console.log(query)
    client.search({
      term,
      location,
      sort_by: "distance",
    }).then(response => {
      res.json({ success: true, query, response,})
    }).catch(err => {
      res.json({
        success: false,
        error: JSON.parse(err.response.body),

      })
    })
  })


}