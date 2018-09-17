let pool = require('../database');

let userServices = {
    getUsers: async () => {
        try {
            let { rows } = await pool.query("SELECT * FROM ticket_schema.users", []);
            return rows;
        } catch (e) {
            console.log('getUsers', e)
            return false;
        }
    },
    checkIfUserDoesNotExist: async (username) => {
        try {
            let { rows } = await pool.query("SELECT * FROM ticket_schema.users WHERE userEmail = $1", [username]);
            
            console.log('checkIfUserDoesNotExist', "rows", rows)

            if(rows.length === 0) {
                console.log('checkIfUserDoesNotExist', "true")
                return true;
            } else {
                console.log('checkIfUserDoesNotExist', "false")
                return false;
            }
        } catch (e) {
            console.log('checkIfUserDoesNotExist', e)
            return false;
        }
    },
    createUser: async (email, password, salt) => {

        let { rows } = pool.query("INSERT INTO ticket_schema.users (userEmail, userPassword, userSalt, active) VALUES ($1, $2, $3, $4);'", [email, password, salt, true])
        
    },
    updateUser: (email, password, salt, active) => {

    }

};

module.exports = userServices;