let express = require('express')
let router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    // Serve react frontend
    res.sendFile('/Users/matthewcaloger/Documents/projects/ticket/client-dev/web-client/build/index.html')

    // TODO: allow deep-linking
  } catch(e) {
    next()
  }
  
})

module.exports = router
