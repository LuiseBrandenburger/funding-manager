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

module.exports.registerProject = (
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
    owner_id
) => {
    const q = `INSERT INTO projects (name, project_number, 
        artist_name, project_start, project_end, 
        project_description, program_name, manager, 
        approved_funding, approved, owner_id)

    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
        owner_id,
    ];
    return db.query(q, params);
};

module.exports.addOutgoing = (
    projectId,
    category,
    option,
    position,
    price,
    quantity,
    file,
    notes,
    finalSum,
    total,
    isPaid,
    paidDate,
    userId
) => {
    const q = `INSERT INTO outgoings (project_id, category, option, position, price, quantity, file, notes, fc_total, total, paid, paiddate, sender_id)

    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING id`;

    const params = [
        projectId,
        category,
        option,
        position,
        price,
        quantity,
        file,
        notes,
        finalSum,
        total,
        isPaid,
        paidDate,
        userId,
    ];
    return db.query(q, params);
};

module.exports.addIcomings = (
    projectId,
    category,
    position,
    incomeAmount,
    file,
    notes,
    finalSum,
    isPaid,
    paidDate,
    userId
) => {
    const q = `INSERT INTO incomings (project_id, category, position, price, file, notes, total, paid, paiddate, sender_id)

    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id`;

    const params = [
        projectId,
        category,
        position,
        incomeAmount,
        file,
        notes,
        finalSum,
        isPaid,
        paidDate,
        userId,
    ];
    return db.query(q, params);
};



module.exports.getProjectsById = (owner_id) => {
    const q = `SELECT name, project_number, artist_name, id, approved_funding, sum_spend AS sumSpend, sum_left, sum_accounted, funding_received, sum_total FROM projects WHERE owner_id = ($1)`;
    const params = [owner_id];
    return db.query(q, params);
};

/**
 
SET sum_spend = 0,
        SET sum_left = 0,
        SET sum_accounted = 0,
        SET funding_received = 0,
        SET sum_fc_total = 0,
        SET sum_fc_production = 0,
        SET sum_fc_marketing = 0,
        SET sum_fc_tour = 0,
        SET sum_total = 0,
        SET sum_production = 0,
        SET sum_marketing = 0,
        SET sum_tour = 0,
        (name, project_number, 
        artist_name, project_start, project_end, 
        project_description, program_name, manager, 
        approved_funding, approved, owner_id)
 */
