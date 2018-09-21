const { Pool } = require('pg')
let config = require('../config/config')

// test connect
const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port
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