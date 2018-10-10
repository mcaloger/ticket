let express = require('express')
let router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    res.sendFile('/Users/matthewcaloger/Documents/projects/ticket/client-dev/web-client/build/index.html')
  } catch(e) {
    next()
  }
  
})

module.exports = router
