const spicedPg = require("spiced-pg");

const database = "gofundyourself";
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);


module.exports.registerUser = (first, last, email, password) => {
    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id`;

    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.getUserForLogin = (email) => {
    const q = `SELECT email, password, id FROM users WHERE email = ($1)`;
    const params = [email];
    return db.query(q, params);
};