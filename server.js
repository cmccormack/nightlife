///////////////////////////////////////////////////////////
//  Import modules
///////////////////////////////////////////////////////////
const path = require("path")
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const favicon = require("serve-favicon")
require("dotenv").config({path: path.resolve(__dirname, ".env"), })


///////////////////////////////////////////////////////////
//  Initialize Express and configure Middleware
///////////////////////////////////////////////////////////
const app = express()
app.set("port", process.env.PORT || 3000)

// Serve static files
app.use(express.static(path.join(__dirname, "public")))
app.use(favicon(path.resolve(__dirname, "public", "images", "favicon.ico")))

// Body parsing - parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, }))

// Body parsing - parse json
app.use(bodyParser.json())

// Handle cross-site request
app.use(cors())


///////////////////////////////////////////////////////////
//  Import Express Routes and call with Express app
///////////////////////////////////////////////////////////
const routes = require("./routes/routes.js")
routes(app)


///////////////////////////////////////////////////////////
//  Start Express Server
///////////////////////////////////////////////////////////
const server = app.listen(app.get("port"), () => {
  const {port, address, } = server.address()
  console.info(`Express server started on ${address}:${port}`)
})
