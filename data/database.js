const { Pool } = require('pg')
let config = require('../config/config')

// test connect
const pool = new Pool({
  user: process.env.PGUSER,
  host: "localhost",
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

console.log('pgHost', process.env.PGHOST)

// const Query = require('pg').Query;
// const submit = Query.prototype.submit;
// Query.prototype.submit = function() {
  
//     const text = this.text;
//     const values = this.values;
//     const query = values.reduce((q, v, i) => q.replace(`$${i + 1}`, v), text);
//     console.log(query);
//     submit.apply(this, arguments);
  
// };

module.exports = {
  query: (text, params) => pool.query(text, params)
  
}