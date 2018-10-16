let knex = require('../data/knex')

let userRoleServices = {
    getUserRole: async (userId) => {

    },
    addRole: async (userId, role) => {

    }, 
    /**
     * Remove
     *
     * @param {*} userId
     * @param {*} role
     */
    removeRole: async (userId, role) => {

    },
    
    /**
     *Given an int userId and an array roles, set user's roles
     *
     * @param {*} userId
     * @param {*} roles
     */
    setRoles: async (userId, roles) => {

    }
}

module.exports = userRoleServices