let knex = require('../knex')

let ticketCommentServices = {
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