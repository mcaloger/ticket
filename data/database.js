const { Pool } = require('pg')
let config = require('../config/config')

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port
})

console.log('pgHost', process.env.PGHOST)

module.exports = {
  query: (text, params) => pool.query(text, params)
  
}