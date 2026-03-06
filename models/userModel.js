const db =  require("../db");

async function findUserByUserName(username) {
    const result = await db.query(
        "SELECT * FROM users WHERE username = $1", [username]
    );
    return result.rows[0]
};

async function findUserById(id) {
    const result = await db.query(
        "SELECT * FROM users WHERE id = $1", [id]
    );
    return result.rows[0];
};

async function createUser(first_name, last_name, username, email, passwordHash) {

    console.log("provided details: ", first_name, last_name, email)
    const result = await db.query(
        `
            INSERT INTO users (first_name, last_name, username, email, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [first_name, last_name, username, email, passwordHash]
    );

    return  result.rows[0];
};

module.exports = {
    findUserByUserName,
    findUserById,
    createUser
}