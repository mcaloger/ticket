let express = require('express')
let router = express.Router()

let ticketCommentServices = require('../data/services/ticketCommentServices')

router.get('/:id', async (req, res, next) => {
    let id = req.params.id
    let comments = await ticketCommentServices.getCommentsByTicket(id)
    res.json(comments)
})

router.post('/create/:id', async (req, res, next) => {
    try {
        let id = req.params.id

        let userId = req.body.userId
        let commentText = req.body.commentText
        let commentData = req.body.commentData

        let comments = await ticketCommentServices.createTicketComment(id, userId, commentText, commentData)
        res.json(comments)
    } catch(e) {
        next()
    }
    
})

module.exports = router
