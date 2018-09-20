let userServices = require('../services/userServices')
let pool = require('../database')

let ticketServices = {
    getOwnedTickets: async () => {
        let user = await userServices.getLoggedInUsername()

        res.json(user)
    }
}

module.exports = ticketServices