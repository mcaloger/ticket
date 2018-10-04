let pool = require('../database');
let timeServices = require('../../security/timeServices')
let knex = require('../knex')

let userSessionServices = {
    /**
     * Registers the session in the database
     *
     * @param {*} userId
     * @param {*} sessionId
     * @returns
     */
    registerSession: async (userId, sessionId) => {
        try {
            //pool.query('INSERT INTO ticket_schema.usersessions (userid, sessionid, expires) VALUES ($1, $2, $3)', [userId, sessionId, timeServices.getExpirationTimestamp()])
            let query = await knex('usersessions').withSchema('user').insert({
                userid: userId,
                sessionid:sessionId,
                expires: timeServices.getExpirationTimestamp()
            })
        } catch (e) {
            console.log(e)
            return false
        }
    },
    /**
     * Makes session inactive
     *
     * @param {*} sessionId
     * @returns
     */
    invalidateSession: async (sessionId) => {
        try {
            //pool.query('DELETE FROM ticket_schema.usersessions WHERE sessionid = $1', [sessionId])
            let query = await knex('usersessions')
                                .withSchema('user')
                                .delete()
                                .where({
                                    sessionid: sessionId
                                })
        } catch (e) {
            console.log(e)
            return false
        }
    },
    /**
     * Returns the session Id
     *
     * @param {*} sessionId
     * @returns
     */
    checkSessionId: async (sessionId) => {
        try {
            //let query = await pool.query('SELECT usersessions.userid, users.useremail FROM user.usersessions INNER JOIN user.users ON usersessions.userid = users.userid WHERE usersessions.sessionid = $1;', [sessionId])
            let query = await knex('usersessions')
                                .withSchema('user')
                                .select()
                                .innerJoin('users', 'users.userid', 'usersessions.userid')
                                .where({sessionid: sessionId})
                                .withSchema('user')
                                .first()
            if (query){
                return query
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