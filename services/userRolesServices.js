let knex = require('../data/knex')

let userRoleServices = {

    /**
     * Get user roles given a userId
     *
     * @param {*} userId
     */
    getUserRole: (userId) => {
        let roles = knex('userroles').withSchema('ticket').select().where({
            userid: userId
        })

        return roles
    },
    /**
     * Add a user role
     *
     * @param {*} userId
     * @param {*} role
     */
    addRole: async (userId, role) => {
        
    }, 
    /**
     * Remove user role
     *
     * @param {*} userId
     * @param {*} role
     */
    removeRole: async (userId, role) => {

    },
    
    /**
     * Given an int userId and an array roles, set user's roles
     *
     * @param {*} userId
     * @param {*} roles
     */
    setRoles: async (userId, roles) => {

    }
}

module.exports = userRoleServices