let express = require('express')
let router = express.Router()

let ticketCommentServices = require('../data/services/ticketCommentServices')

router.get('/:id', async (req, res, next) => {
    try {
        // fetch given id
        let id = req.params.id

        // get comments assigned to particular ticket.
        let comments = await ticketCommentServices.getCommentsByTicket(id)

        // serve json of comments
        res.json(comments)
    } catch(e) {
        // handle error
        next()
    }
    
})

router.post('/create/:ticketId', async (req, res, next) => {
    try {
        // wrap data object
        let data = {
            ticketId: req.params.ticketId,
            userId: req.body.userId,
            commentText: req.body.commentText,
            commentData: req.body.commentData
        }

        // create a comment on a ticket
        let comments = await ticketCommentServices.createTicketComment(data.ticketId, data.userId, data.commentText, data.commentData)
        
        // return result
        res.json(comments)
    } catch(e) {
        // handle error
        next()
    }
    
})

module.exports = router
