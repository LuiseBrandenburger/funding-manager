const express = require("express");
const plan = express.Router();
// const { validateEmail } = require("../utils/helpers");
// const { hash } = require("../utils/bc");
// const { compare } = require("../utils/bc");

const { addOutgoing, addIcomings } = require("../sql/db");

/*************************** ROUTES ***************************/

console.log("Hello from Projects");

// projects.get("/api/user-id", function (req, res) {
//     res.json({
//         userId: req.session.userId,
//     });
// });

// plan.get("/all-projects", function (req, res) {
//     getProjectsById(req.session.userId).then(({ rows }) => {
//         // console.log("rows after projects have been fetched: ", rows);
//         res.json({
//             data: rows,
//         });
//     });
// });

plan.post("/api/edit-outgoings", (req, res) => {
    console.log("req.body in registration.json request: ", req.body);

    // TODO: PROJECT ID AND SUM ANPASSEN!!!
    let totalSum = 0;
    let projectId = 1;

    const data = req.body;
   
    if (!data.quantity) {
        data.quantity = 1;
    }

    addOutgoing(
        projectId,
        data.category,
        data.option,
        data.position,
        data.price,
        data.quantity,
        data.file,
        data.notes,
        data.finalSum,
        totalSum,
        data.isPaid,
        data.paidDate,
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

plan.post("/api/edit-incomings", (req, res) => {
    console.log("req.body in registration.json request: ", req.body);

    // TODO: PROJECT ID AND SUM ANPASSEN!!!
    // let totalSum = 0;
    let projectId = 1;

    const data = req.body;

    if (!data.quantity) {
        data.quantity = 1;
    }

    addIcomings(
        projectId,
        data.incomeCategory,
        data.incomePosition,
        data.incomeAmount,
        data.incomeFile,
        data.incomeNotes,
        data.incomeReceived,
        data.isIncomePaid,
        data.incomePaidDate,
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

module.exports = plan;
