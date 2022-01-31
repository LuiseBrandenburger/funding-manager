const express = require("express");
const finance = express.Router();
// const { validateEmail } = require("../utils/helpers");
// const { hash } = require("../utils/bc");
// const { compare } = require("../utils/bc");

const {
    getOutgoingsByProjectId,
    getIncomingsByProjectId,
    getOutgoingsSumFC,
    getAllOutgoingsByuserId
} = require("../sql/db");

/*************************** ROUTES ***************************/

console.log("Hello from Projects");

finance.get("/all-outgoings", function (req, res) {

    getAllOutgoingsByuserId(req.session.userId).then(({ rows }) => {
        console.log("rows after projects have been fetched: ", rows);
        res.json({
            data: rows,
        });
    });
});


finance.get("/all-outgoings/:id", function (req, res) {
    console.log("params in request body outgoings: ", req.params.id);

    let projectId = req.params.id;
    getOutgoingsByProjectId(projectId).then(({ rows }) => {
        console.log("rows after projects have been fetched: ", rows);
        res.json({
            data: rows,
        });
    });
});


// finance.get("/all-incomings/:id", function (req, res) {
//     console.log("params in request body outgoings: ", req.params);

//     getIncomingsByProjectId(req.session.userId).then(({ rows }) => {
//         // console.log("rows after projects have been fetched: ", rows);
//         res.json({
//             data: rows,
//         });
//     });
// });

/*************************** EXPORT ***************************/

module.exports = finance;
