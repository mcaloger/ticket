let express = require('express')
let router = express.Router()

let userServices = require('../data/services/userServices')
let ticketServices = require('../data/services/ticketServices')

let Joi = require('joi')

/* GET home page. */
router.get('/', async (req, res, next) => {
  let sessionId = req.headers.sessionid

  console.log('sess', sessionId, req.body)

  if (typeof (sessionId) == undefined) {
    res.setHeader('WWW-Authenticate', 'Basic')
    res.status(401).json({
      message: "Unauthenticated"
    })
  } else { 
    let ownedTickets = ticketServices.getOwnedTickets(sessionId)

    res.json(ownedTickets)
  }
})

router.get('/user/:id', async (req, res, next) => {
  try {
    let sessionId = req.headers.sessionid

    let tickets = await ticketServices.getUserOwnedTickets(null, req.params.id)

    res.json(tickets)
  } catch (e) {
    console.log(e)
    next()
  }
  
})

router.post('/create', async (req, res, next) => {
  try {
    let sessionId = req.headers.sessionid

    console.log('sess', sessionId, req.body)

    if(typeof(sessionId) == undefined) {
      res.setHeader('WWW-Authenticate', 'Basic')
      res.status(401).json({message: "Unauthenticated"})
    } else {
      console.log('sessokay')
      let user = await userServices.getLoggedInUser(sessionId)

      let data = {
        ownerId: req.body.ownerId,
        requesterId: req.body.requesterId,
        summary: req.body.summary,
        description: req.body.description
      }

      let schema = Joi.object().keys({
        ownerId: Joi.number(),
        requesterId: Joi.number(),
        summary: Joi.string(),
        description: Joi.string()
      })

      let { error } = Joi.validate(data, schema)

      if(error === null) {
        if (user != null) {

          let create = ticketServices.createTicket(data.ownerId, data.requesterId, data.summary, data.description)
          console.log('create2', create, user)
        }

        res.status(200).json({
          message: 'success'
        })
      } else {
        res.status(400).json({
          error: 'ValidationError'
        })
      }
    }
  } catch (e) {
    console.log(e)
    next()
  }
})

module.exports = router