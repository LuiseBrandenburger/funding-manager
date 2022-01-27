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

module.exports.registerProject = (name, project_number, artist_name, project_start, project_end , project_description, program_name, manager, approved_funding, approved) => {
    const q = `INSERT INTO projects (name, project_number, 
        artist_name, project_start, project_end, 
        project_description, program_name, manager, 
        approved_funding, approved)

    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id`;

    const params = [
        name,
        project_number,
        artist_name,
        project_start,
        project_end,
        project_description,
        program_name,
        manager,
        approved_funding,
        approved,
    ];
    return db.query(q, params);
};