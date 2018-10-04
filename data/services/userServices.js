let pool = require('../database');
let bcryptServices = require('../../security/bcryptServices')
let cryptoServices = require ('../../security/cryptoServices')
let userSessionServices = require('../services/userSessionServices')
let knex = require('../knex')
let Joi = require('joi')
let config = require('../../config/config')
let Jwt = require('jsonwebtoken')

let userServices = {
    /**
     * -DEV ONLY- Returns list of users
     *
     * @returns []
     */
    getUsers: async () => {
        try {
            let query = await knex('users').withSchema('user').select()
            return query
        } catch (e) {
            console.log(e)
            throw new Error('ServiceError')
        }
    },

    /**
     * -DEV ONLY- Returns user with userid {id}
     *
     * @param {int} id
     * @returns user {}
     */
    getUserById: async (id) => {
        try {
            const schema = Joi.object().keys({
                id: Joi.number().integer().greater(0).required()
            })

            const {error, value} = Joi.validate({id: id}, schema)

            if(error === null) {
                let query = await knex('users').withSchema('user').select().where({
                    userid: id
                })
                return query;
            }
            else {
                throw new Error('validationError')
            }
        } catch (e) {
            console.log(e)
            throw new Error('ServiceError')
        }
    },

    /**
     *
     *
     * @param {*} email
     * @returns
     */
    getUserIdFromEmail: async (email) => {
        try {
            //let { query } = await pool.query("SELECT * FROM user.users WHERE useremail = $1", [email]);
            let query = await knex('users').withSchema('user').select().where({
                useremail: email
            })
            return query[0].userid
        } catch (e) {
            throw new Error('ServiceError')
        }
    },
    /**
     * Used to see if username exists already
     *
     * @param {*} username
     * @returns
     */
    checkIfUserDoesNotExist: async (username) => {
        try {
            //let { query } = await pool.query("SELECT * FROM user.users WHERE useremail = $1", [username]);
            let query = await knex('users').withSchema('user').select().where({
                useremail: username
            })
            if(query.length === 0) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            throw new Error('ServiceError')
        }
    },
    /**
     * Creates user
     *
     * @param {*} email
     * @param {*} password
     * @param {*} salt
     * @returns
     */
    createUser: async (email, password, salt) => {
        try {
            let values = {
                email: email,
                password: password,
                salt: salt
            }
            //pool.query("INSERT INTO user.users (useremail, userpassword, usersalt, active) VALUES ($1, $2, $3, $4);", [email, password, salt, true])
            const schema = Joi.object().keys({
                email: Joi.string().email({
                    minDomainAtoms: 2
                }).required(),
                password: Joi.string().min(12).required(),
                salt: Joi.string().required()
            })

            const { error, value } = Joi.validate(values, schema)

            if(error === null) {
                let query = await knex('users').withSchema('user').insert({
                    useremail: email,
                    userpassword: password,
                    usersalt: salt,
                    active: true
                })

                return true
            } else {
                return { error: 'ValidationError' }
            }
        } catch (e) {
            console.log(e)
            throw new Error('ServiceError')
        }
    },
    /**
     * Registers user, hands off to createUser()
     *
     * @param {*} email
     * @param {*} password
     * @returns
     */
    register: async (email, password) => {
        try {
            const schema = Joi.object().keys({
                email: Joi.string().email({ minDomainAtoms: 2 }).required(),
                password: Joi.string().min(12).required()
            })

            let { error, value } = Joi.validate({email: email, password: password}, schema)

            if(error == null) {
                let doesNotExist = await userServices.checkIfUserDoesNotExist(email)

                if (doesNotExist === true) {

                    let saltedHashedPassword = await bcryptServices.saltAndHash(password)

                    let createUser = await userServices.createUser(email, saltedHashedPassword.hash, saltedHashedPassword.salt)

                    if (createUser) {
                        return true
                    } else {
                        return { 
                            error: 'RegisterError'
                        }
                    }
                } else {
                    return {
                        error: 'UniqueUserError'
                    }
                }
            } else {
                return {
                    error: 'ValidationError'
                }
            }    
        } catch (e) {
            console.log(e)
            throw new Error('ServiceError')
        }
        
    },
    /**
     * TODO
     *
     * @param {*} email
     * @param {*} password
     * @param {*} salt
     * @param {*} active
     */
    updateUser: async (email, password, salt, active) => {

    },
    /**
     * TODO Update user's active status
     *
     */
    updateUserActive: async () => {

    },
    /**
     * Check if proper username/password, issue sessionId (TODO: JWT) if so
     *
     * @param {*} email
     * @param {*} password
     * @returns
     */
    login: async (email, password) => {
        try {
            // let { query } = await pool.query("SELECT * FROM user.users WHERE useremail = $1", [email])
            console.log('kogin', email, password)
            let query = await knex('users').withSchema('user').select().where({
                useremail: email
            }).first()

            console.log(query)

            if(query){
                console.log(query.userpassword)
                let hashedSaltedPassword = await bcryptServices.compare(password, query.userpassword)
                let sessionToken = await cryptoServices.generateSessionId()
                let jwt = Jwt.sign(sessionToken, config.jwtkey)
                
                if(hashedSaltedPassword == true) {
                    let userId = await userServices.getUserIdFromEmail(email)
                    userSessionServices.registerSession(userId, sessionToken)
                    return {login: true, sessionToken: sessionToken, jwt, error: null}
                } else {
                    return {login: false, error: "Invalid username/password"}
                }
            } else {
                return {login: false, error: "Invalid username/password."}
            }
        } catch (e) {
            console.error(e)
            return false
        }
    },
    /**
     * Given sessionID (TODO: JWT) get user
     *
     * @param {*} sessionId
     * @returns
     */
    getLoggedInUser: async (sessionId) => {
        try {
            let user = await userSessionServices.checkSessionId(sessionId)
            console.log(user)
            return user
        } catch (e) {
            throw new Error('ServiceError')
        }
    }
};

module.exports = userServices;