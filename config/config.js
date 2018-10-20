let config = {
    securityTimePolicyDays: 90, // How long a session should stay logged
    saltRounds: 12, // Rounds used for salt+hash
    dbDebug: false, // Settign for if knex should output debugging logs
    sessionIdBytes: 128, // length of sessionIDs 
    db: {
        user: process.env.PGUSER, // db username
        host: process.env.PGHOST, // DB hostname (localhost)
        database: process.env.PGDATABASE, // databse name (tickets)
        password: process.env.PGPASSWORD, // database password
        port: process.env.PGPORT, // Database port
    },
    jwtkey: process.env.JWTSECRET // JWT key for signing
}

module.exports = config