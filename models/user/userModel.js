let Joi = require('joi')

class User {
    constructor() {
        this.userId = null
        this.userEmail = null
        this.userPassword = null
        this.userSalt = null
        this.userActive = null
    }

    setUserId(value) {
        const schema = Joi.string().min(10)
        let {
            error
        } = Joi.validate(value, schema)

        if (error === null) {
            this.userId = value
            return true
        } else {
            return false
        }
    }

    setUserEmail(value) {
        const schema = Joi.string().min(10)
        let {
            error
        } = Joi.validate(value, schema)

        if (error === null) {
            this.userId = value
            return true
        } else {
            return false
        }
    }

    export() {
        output = {
            useremail: this.userEmail,
            userpassword: this.userPassword,
            usersalt: this.userSalt,
            useractive: this.userActive
        }

        return output
    }
}

module.exports = User