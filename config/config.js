let config = {
    securityTimePolicyDays: 90, // How long a session should stay logged
    saltRounds: 12, // Rounds used for salt+hash
    dbDebug: false,
    sessionIdBytes: 128,
    db: {
        user: process.env.PGUSER,
        host: "localhost",
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    },
    jwtkey: process.env.JWTSECRET
}

module.exports = config