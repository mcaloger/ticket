CREATE TABLE users {
    userId SERIAL PRIMARY KEY,
    userEmail TEXT,
    userPassword TEXT,
    userSalt TEXT,
    active BOOLEAN
}

