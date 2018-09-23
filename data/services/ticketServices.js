let userServices = require('../services/userServices')
let knex = require('../knex')
let pool = require('../database')

let ticketServices = {
    getOwnedTickets: async () => {
        try {
            let user = await userServices.getLoggedInUsername()

            res.json(user)
        } catch (e) {
            throw new Error('ServiceError')
        }
    },
    createTicket: async (ownerId, requesterId, summary, description) => {
        try {
            let rows = await knex('tickets').withSchema('ticket').insert({
                ownerid: ownerId,
                requesterid: requesterId,
                summary: summary,
                description: description
            })
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