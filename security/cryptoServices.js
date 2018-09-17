let crypto = require("crypto");

let cryptoServices = {
    generateSessionId: async () => {
        return crypto.randomBytes(128).toString('hex')
    }
}

module.exports = cryptoServices