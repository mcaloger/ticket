let knex = require('../data/knex')

let ticketCommentServices = {
    /**
     * Add a ticket comment
     *
     * @param {*} ticketId
     * @param {*} userId
     * @param {*} commentText
     * @param {*} commentData
     * @returns
     */
    createTicketComment: async (ticketId, userId, commentText, commentData) => {
        try {
            let query = await knex('ticketcomments').withSchema('ticket').insert({
                ticketid: ticketId,
                usercommenterid: userId,
                commenttext: commentText,
                commentdata: commentData
            })

            return true
        } catch (e) {
            console.log(e)
            return false
        }
        
    },
    /**
     * **TODO**
     *
     * @param {*} ticketId
     * @returns
     */
    /**
     * Retrieve ticlket comments given ticket id
     *
     * @param {*} ticketId
     * @returns
     */
    getCommentsByTicket: async (ticketId) => {
        try {
            console.log('ticketid', ticketId)
            let query = await knex('ticketcomments').withSchema('ticket').select().where({
                ticketid: ticketId
            })

            return query
        } catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = ticketCommentServices