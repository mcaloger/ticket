let app = require('../../app')

// Middleare to pull session ID on each request
let getSessionId = (req, res, next) => {
    // Get id before all route handling and give to req
    req.sessionId = req.header('sessionid')
    console.log('headers', req.headers, req.sessionId)
}

module.exports = getSessionId