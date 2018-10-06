let crypto = require("crypto")
let config = require('../config/config')

let cryptoServices = {
    generateSessionId: async () => {
        try {
            let length = config.sessionIdBytes
            return crypto.randomBytes(length).toString('hex')
        } catch (e) {
            throw new Error('cryptoError')
        }
    },
    generateRandomChars: async (length) => {
        try {
            let result = crypto.randomBytes(length).toString('hex')
            return result
        } catch (e) {
            throw new Error('cryptoError')
        }

    }
}

module.exports = cryptoServices