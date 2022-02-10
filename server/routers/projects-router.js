const express = require("express");
const projects = express.Router();
// const { validateEmail } = require("../utils/helpers");
// const { hash } = require("../utils/bc");
// const { compare } = require("../utils/bc");

const { registerProject, getProjectsById } = require("../sql/db");

/*************************** ROUTES ***************************/


projects.get("/all-projects", function (req, res) {

    getProjectsById(req.session.userId).then(({ rows }) => {
        res.json({
            data: rows,
        });
    });


});


projects.post("/api/projects", (req, res) => {

    const data = req.body;
    if (!data.approvedFunding) {
        data.approvedFunding = 0;
    }
    if (!data.approved) {
        data.approved = false;
    }

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
