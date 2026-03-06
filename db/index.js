const {Pool} = require("pg");

const pool = new Pool({
    user: process.env.PGUSER,
    host: "localhost",
    database: "members_only",
    password: process.env.PGPASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;