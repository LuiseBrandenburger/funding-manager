const express = require("express");
const projects = express.Router();
// const { validateEmail } = require("../utils/helpers");
// const { hash } = require("../utils/bc");
// const { compare } = require("../utils/bc");

// const { getUserForLogin, registerUser } = require("../sql/db");

/*************************** ROUTES ***************************/

console.log("Hello from Projects");

// projects.get("/api/user-id", function (req, res) {
//     res.json({
//         userId: req.session.userId,
//     });
// });


/*************************** EXPORT ***************************/

module.exports = projects;
