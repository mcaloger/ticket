let express = require('express')
let router = express.Router()

let userServices = require('../data/services/userServices')
let ticketServices = require('../data/services/ticketServices')

let Joi = require('joi')

router.get('/', async (req, res, next) => {
  try {
    // Set sessionId to header "sessionid"
    let sessionId = req.headers.sessionid

    // Check that sessionId is defined
    if (typeof (sessionId) == undefined) {
      // If undefined, set headers to display improper auth
      res.setHeader('WWW-Authenticate', 'Basic')
      res.status(401).json({
        message: "Unauthenticated"
      })
    } else { 
      // Retrieve owned tickets
      let ownedTickets = ticketServices.getOwnedTickets(sessionId)

      // Serve owned tickets
      res.json(ownedTickets)
    }
  } catch(e) {
    next()
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