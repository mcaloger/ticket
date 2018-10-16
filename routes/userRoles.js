let express = require('express')
let router = express.Router()

router.get('/', function(req, res, next) {
  try {

    // TODO: allow deep-linking
  } catch(e) {
    next()
  }
  
})

module.exports = router
