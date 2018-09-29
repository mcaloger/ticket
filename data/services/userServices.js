let pool = require('../database');
let bcryptServices = require('../../security/bcryptServices')
let cryptoServices = require ('../../security/cryptoServices')
let userSessionServices = require('../services/userSessionServices')
let knex = require('../knex')
let Joi = require('joi')
let config = require('../../config/config')
let Jwt = require('jsonwebtoken')

let userServices = {
    getUsers: async () => {
        try {
            let rows = await knex('users').withSchema('user').select()
            return rows
        } catch (e) {
            console.log(e)
            throw new Error('ServiceError')
        }
    },

    /**
     *
     *
     * @param {*} id
     * @returns user {}
     */
    getUserById: async (id) => {
        try {
            const schema = Joi.object().keys({
                id: Joi.number().integer().greater(0).required()
            })

            const {error, value} = Joi.validate({id: id}, schema)

            if(error === null) {
                let rows = await knex('users').withSchema('user').select().where({
                    userid: id
                })
                return rows;
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
            //let { rows } = await pool.query("SELECT * FROM user.users WHERE useremail = $1", [email]);
            let rows = await knex('users').withSchema('user').select().where({
                useremail: email
            })
            return rows[0].userid
        } catch (e) {
            throw new Error('ServiceError')
        }
    },
    checkIfUserDoesNotExist: async (username) => {
        try {
            //let { rows } = await pool.query("SELECT * FROM user.users WHERE useremail = $1", [username]);
            let rows = await knex('users').withSchema('user').select().where({
                useremail: username
            })
            if(rows.length === 0) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            throw new Error('ServiceError')
        }
    },
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
    updateUser: async (email, password, salt, active) => {

    },
    updateUserActive: async () => {

    },
    login: async (email, password) => {
        try {
            // let { rows } = await pool.query("SELECT * FROM user.users WHERE useremail = $1", [email])
            console.log('kogin', email, password)
            let rows = await knex('users').withSchema('user').select().where({
                useremail: email
            }).first()

            console.log(rows)

            if(rows){
                console.log(rows.userpassword)
                let hashedSaltedPassword = await bcryptServices.compare(password, rows.userpassword)
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
    getLoggedInUser: async (sessionId) => {
        try {
            console.log('getloggedinusername', sessionId)
            // const values = { sessionId: sessionId }

            // const schema = Joi.object().keys({
            //     password: Joi.string().min(12).required()
            // })

            let user = await userSessionServices.checkSessionId(sessionId)
            console.log(user)
            return user
        } catch (e) {
            throw new Error('ServiceError')
        }
    }
};

module.exports = userServices;