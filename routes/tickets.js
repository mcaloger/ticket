let express = require('express')
let router = express.Router()

let ticketServices = require('../data/services/ticketServices')

/* GET home page. */
router.get('/', async (req, res, next) => {
  let ownedTickets = ticketServices.getOwnedTickets()
  res.json(ownedTickets)
})

router.post('/create', async (req, res, next) => {
  try {
    let currentUser = req.headers.sessionid
    let ownerId = req.body.ownerId
    let requesterId = req.body.requesterId
    let summary = req.body.summary
    let description = req.body.description

    if(currentUser != null) {
      console.log('create2', 'create')
      let create = ticketServices.createTicket(ownerId, requesterId, summary, description)
    }

    res.json({message: 'success'})
  } catch (e) {
    next()
  }
  


})

module.exports = router;