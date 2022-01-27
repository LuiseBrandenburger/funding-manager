const express = require("express");
const projects = express.Router();
// const { validateEmail } = require("../utils/helpers");
// const { hash } = require("../utils/bc");
// const { compare } = require("../utils/bc");

const { registerProject } = require("../sql/db");

/*************************** ROUTES ***************************/

console.log("Hello from Projects");

// projects.get("/api/user-id", function (req, res) {
//     res.json({
//         userId: req.session.userId,
//     });
// });

projects.post("/api/projects", (req, res) => {
    console.log("req.body in registration.json request: ", req.body);

    const data = req.body;

    // const mailError = validateEmail(data.email);
    // console.log("Mail Error is: ", mailError);
    // (name, project_number, artist_name, project_start, project_end , project_description, program_name, manager, approved_funding, approved)

    registerProject(
        data.projectName,
        data.projectNumber,
        data.artistName,
        data.projectStart,
        data.projectEnd,
        data.projectDescription,
        data.programName,
        data.manager,
        data.approvedFunding,
        data.approved,
        req.session.userId
    )
        .then(({ rows }) => {
            // req.session.userId = rows[0].id;
            // console.log("console.log req.session: ", req.session);
            console.log(rows);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error adding project: ", err);
            res.json({ success: false });
        });
});

/*************************** EXPORT ***************************/

module.exports = projects;
