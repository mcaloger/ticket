let pool = require('../database');
let timeServices = require('../../security/timeServices')

let userSessionServices = {
    registerSession: async (userId, sessionId) => {
        try {
            pool.query('INSERT INTO ticket_schema.usersessions (userid, sessionid, expires) VALUES ($1, $2, $3)', [userId, sessionId, timeServices.getExpirationTimestamp()])
        } catch (e) {
            console.log(e)
            return false
        }
    },
    invalidateSession: async (sessionId) => {
        try {
            pool.query('DELETE FROM ticket_schema.usersessions WHERE sessionid = $1', [sessionId])
        } catch (e) {
            console.log(e)
            return false
        }
    },
    checkSessionId: async (sessionId) => {
        try {
            let { rows } = await pool.query('SELECT usersessions.userid, users.useremail FROM ticket_schema.usersessions INNER JOIN ticket_schema.users ON usersessions.userid = users.userid WHERE usersessions.sessionid = $1;', [sessionId])
            console.log("checkSessionId", rows)
            if(rows){
                return rows[0]
            } else {
                return false
            }
        } catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = userSessionServices