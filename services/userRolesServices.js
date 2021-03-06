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
     * @param {number} userId
     * @param {string} role
     */
    addRole: async (userId, role) => {
        let roles = knex('userroles').withSchema('ticket').select().where({
            userid: userId
        })
    }, 
    /**
     * Remove user role
     *
     * @param {number} userId
     * @param {string} role
     */
    removeRole: async (userId, role) => {

    },
    
    /**
     * Given an number userId and an array roles, set user's roles
     *
     * @param {number} userId
     * @param {string[]} roles
     */
    setRoles: async (userId, roles) => {

    }
}

module.exports = userRoleServices