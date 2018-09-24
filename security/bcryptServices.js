let bcrypt = require('bcryptjs');

let bcryptServices = {
    hash: (password, salt) => {
        return bcrypt.hashSync(password, salt)
    },
    saltAndHash: async (password) => {
        let salt = bcrypt.genSaltSync(12);
        let hash = bcrypt.hashSync(password, salt);

        let result = {
            salt: salt,
            hash: hash
        }

        return result;
    },
    compare: async (password, hash) => {
        try {
            console.log(password, hash)
            return bcrypt.compareSync(password, hash)
        } catch(e) {
            console.log(e)
            return false;
        }
        
    }
}

module.exports = bcryptServices