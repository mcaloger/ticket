let config = {
    securityTimePolicyDays: 90,
    saltRounds: 12,
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