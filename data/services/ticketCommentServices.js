let knex = require('../knex')

let ticketCommentServices = {
    createTicketComment: async (ticketId, userId, commentText, commentData) => {
        try {
            let addComment = await knex('ticketcomments').withSchema('ticket').insert({
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
    getCommentsByTicket: async (ticketId) => {
        try {
            console.log('ticketid', ticketId)
            let comments = await knex('ticketcomments').withSchema('ticket').select().where({
                ticketid: ticketId
            })

            return comments
        } catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = ticketCommentServices