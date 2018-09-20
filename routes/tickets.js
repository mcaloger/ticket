let express = require('express')
let router = express.Router()

let ticketServices = require('../data/services/ticketServices')

/* GET home page. */
router.get('/', async (req, res, next) => {
  let ownedTickets = ticketServices.getOwnedTickets()
  res.json(ownedTickets)
})

router.get('/check/:name', async (req, res, next) => {
  let result = userServices.checkIfUserDoesNotExist(req.params.name)
  res.json(result)
})

module.exports = router;
