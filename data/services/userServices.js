let pool = require('../database');
let bcryptServices = require('../../security/bcryptServices')
let cryptoServices = require ('../../security/cryptoServices')
let userSessionServices = require('../services/userSessionServices')
let knex = require('../knex')

let userServices = {
    getUsers: async () => {
        try {
            //let { rows }  = await pool.query("SELECT * FROM ticket_schema.users", []);
            let rows = await knex('users').withSchema('ticket_schema').select()
            
            return rows;
        } catch (e) {
            console.log(e)
            throw new Error('dbErr')
        }
    },
    getUserById: async (id) => {
        try {
            let rows = await knex('users').withSchema('ticket_schema').select().where({
                userid: id
            })
            return rows;
        } catch (e) {
            console.log(e)
            throw new Error('dbErr')
        }
    },
    getUserIdFromEmail: async (email) => {
        try {
            let { rows } = await pool.query("SELECT * FROM ticket_schema.users WHERE useremail = $1", [email]);
            return rows[0].userid
        } catch (e) {
            console.ererror(e)
            return false;
        }
    },
    checkIfUserDoesNotExist: async (username) => {
        try {
            let { rows } = await pool.query("SELECT * FROM ticket_schema.users WHERE useremail = $1", [username]);

            if(rows.length === 0) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.error('checkIfUserDoesNotExist', e)
            return false;
        }
    },
    createUser: async (email, password, salt) => {
        try {
            pool.query("INSERT INTO ticket_schema.users (useremail, userpassword, usersalt, active) VALUES ($1, $2, $3, $4);", [email, password, salt, true])
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    register: async (email, password) => {
        let doesNotExist = await userServices.checkIfUserDoesNotExist(email)

        if(doesNotExist === true) {

            let saltedHashedPassword = await bcryptServices.saltAndHash(password)

            let createUser = await userServices.createUser(email, saltedHashedPassword.hash, saltedHashedPassword.salt)
            if (createUser) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    },
    updateUser: async (email, password, salt, active) => {

    },
    updateUserActive: async () => {

    },
    login: async (email, password) => {
        try {
            let { rows } = await pool.query("SELECT * FROM ticket_schema.users WHERE useremail = $1", [email])

            if(rows){
                let hashedSaltedPassword = await bcryptServices.compare(password, rows[0].usersalt, rows[0].userpassword)
                let sessionToken = await cryptoServices.generateSessionId()
                if(hashedSaltedPassword == true) {
                    let userId = await userServices.getUserIdFromEmail(email)
                    userSessionServices.registerSession(userId, sessionToken)
                    return {login: true, sessionToken: sessionToken, message:"success"}
                } else {
                    return {login: false, message: "Invalid username/password"}
                }
            } else {
                return {login: false, message: "Invalid username/password."}
            }
        } catch (e) {
            console.error(e)
            return false
        }
    },
    getLoggedInUser: async (sessionId) => {
        try {
            let user = await userSessionServices.checkSessionId(sessionId)
            console.log(user)
            return user
        } catch (e) {
            throw new Error('dbError')
        }
        
    }

};

module.exports = userServices;