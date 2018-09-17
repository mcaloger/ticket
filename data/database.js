const { Pool } = require('pg')

// test connect
const pool = new Pool({
  user: process.env.PGUSER,
  host: "localhost",
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

console.log('pgHost', process.env.PGHOST)

module.exports = {
  query: (text, params) => pool.query(text, params)
}