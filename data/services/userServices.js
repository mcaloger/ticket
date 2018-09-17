let pool = require('../database');
let bcryptServices = require('../../security/bcryptServices')
let cryptoServices = require ('../../security/cryptoServices')
let userSessionServices = require('../services/userSessionServices')

let userServices = {
    getUsers: async () => {
        try {
            let { rows }  = await pool.query("SELECT * FROM ticket_schema.users", []);
            return rows;
        } catch (e) {
            console.error('getUsers', e)
            return false;
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
            
            console.log('checkIfUserDoesNotExist', "rows", rows)

            if(rows.length === 0) {
                console.log('checkIfUserDoesNotExist', "true")
                return true;
            } else {
                console.log('checkIfUserDoesNotExist', "false")
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
    updateUser: async (email, password, salt, active) => {

    },
    updateUserActive: async () => {

    },
    login: async (email, password) => {
        try {
            let { rows } = await pool.query("SELECT * FROM ticket_schema.users WHERE useremail = $1", [email]);

            if(rows){
                let hashedSaltedPassword = await bcryptServices.compare(password, rows[0].usersalt, rows[0].userpassword)
                let sessionToken = await cryptoServices.generateSessionId();
                if(hashedSaltedPassword == true) {
                    let userId = await userServices.getUserIdFromEmail(email);
                    userSessionServices.registerSession(userId, sessionToken)
                    return {login: true, sessionToken: sessionToken, message:"success"}
                } else {
                    return {login: false, message: "Invalid username/password"}
                }
            } else {
                return {login: false, message: "Invalid username/password."}
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    getLoggedInUsername: async (sessionId) => {
        let user = await userSessionServices.checkSessionId(sessionId)
        console.log(user)
        return user
    }

};

module.exports = userServices;