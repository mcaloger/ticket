let crypto = require("crypto");
let config = require('../config/config')

let cryptoServices = {
    generateSessionId: async () => {
        let length = config.sessionIdBytes
        return crypto.randomBytes(length).toString('hex')
    },
    generateRandomChars: async (length) => {
        let result = crypto.randomBytes(length).toString('hex')
        return result
    }
}

module.exports = cryptoServices