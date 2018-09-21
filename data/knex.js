let config = require('../config/config')

let knex = require('knex')({
    client: 'pg',
    connection: {
        user: config.db.user,
        host: config.db.host,
        database: config.db.database,
        password: config.db.password,
        port: config.db.port
    },
    asyncStackTraces: true,
    debug: true
})



module.exports = knex