let userServices = require('../services/userServices')
let knex = require('../knex')
let pool = require('../database')

let ticketServices = {
    getOwnedTickets: async (sessionId) => {
        try {
            let user = await userServices.getLoggedInUser(sessionId)

            let tickets = knex('tickets').select().where({
                ownerid: user.userId
            })

            res.json(tickets)
        } catch (e) {
            throw new Error('ServiceError')
        }
    },
    getUserOwnedTickets: async (sessionId, userId) => {
        console.log('userid', userId)
        try {
            let tickets = await knex('tickets').withSchema('ticket').select().where({
                ownerid: userId
            })

            return tickets
        } catch(e) {
            console.log(e)
            throw new Error('ServiceError')
            
        }
        //let user = await userServices.getLoggedInUser(sessionId)

        
    },
    createTicket: async (ownerId, requesterId, summary, description) => {
        try {
            console.log('createowneridreq', ownerId, requesterId)
            let rows = await knex('tickets').withSchema('ticket').insert({
                ownerid: ownerId,
                requesterid: requesterId,
                summary: summary,
                description: description
            })

            return true
        } catch (e) {
            console.log(e)
            throw new Error('ServiceError')
        }
    },
    updateTicket: async (ticketId, ownerId, requesterId, summary, description) => {
        try {
            let rows = await knex('tickets').withSchema('ticket').update({
                ownerid: ownerId,
                requesterId: requesterId,
                summary: summary,
                description: description
            }).where({
                ticketid: ticketId
            })
        } catch (e) {
            throw new Error('ServiceError')
        }
    },
}

module.exports = ticketServices