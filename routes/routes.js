const path = require("path")


module.exports = (app) => {

  const root = path.resolve(__dirname, "..")
  const publicPath = path.join(root, "public")


  ///////////////////////////////////////////////////////////
  // Testing/Debug Middleware
  ///////////////////////////////////////////////////////////
  app.use((req, res, next) => {
    const { user = { username: null, }, } = req
    console.debug(`DEBUG path: ${req.path}`)
    next()
  })


  ///////////////////////////////////////////////////////////
  // Default Route Handler, Loads React App
  ///////////////////////////////////////////////////////////
  app.get("*", (req, res) => {
    console.info(`Default Route Handler for ${req.hostname + req.path}`)
    res.sendFile(path.join(publicPath, "index.html"))
  })


  ///////////////////////////////////////////////////////////
  // Error Handler
  ///////////////////////////////////////////////////////////
  /* eslint no-unused-vars: 0 */
  app.use((err, req, res, next) => {

    const errmsg = (err.message ? err.message : err).replace("Error: ", "")

    console.error(`Error Middleware: ${errmsg}`)
    res.type("json").send({
      success: false,
      message: errmsg,
      error: err,
    })
  })

}