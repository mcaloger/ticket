let userServices = require('../data/services/userServices')
let knex = require('../data/knex')
let pool = require('../data/database')

let ticketServices = {
    /**
     * Given sessionId, get tickets that belong to user
     *
     * @param {number} sessionId
     */
    getOwnedTickets: async (sessionId) => {
        try {
            let user = await userServices.getLoggedInUser(sessionId)

            let tickets = knex('tickets').withSchema('ticket').select().where({
                ownerid: user.userId
            })

            res.json(tickets)
        } catch (e) {
            throw new Error('ServiceError')
        }
    },
    /**
     * Given a userId, and a sessionId for authentication, get tickets owned by user
     *
     * @param {number} sessionId
     * @param {number} userId
     * @returns
     */
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
    /**
     * Generate a new ticket
     *
     * @param {number} ownerId
     * @param {number} requesterId
     * @param {string} summary
     * @param {string} description
     * @returns
     */
    createTicket: async (ownerId, requesterId, summary, description) => {
        try {
            let query = await knex('tickets').withSchema('ticket').insert({
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
    /**
     * Update a ticket
     *
     * @param {number} ticketId
     * @param {number} ownerId
     * @param {number} requesterId
     * @param {string} summary
     * @param {string} description
     */
    updateTicket: async (ticketId, ownerId, requesterId, summary, description) => {
        try {
            let query = await knex('tickets').withSchema('ticket').update({
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