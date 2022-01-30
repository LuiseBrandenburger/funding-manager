const express = require("express");
const plan = express.Router();
// const { validateEmail } = require("../utils/helpers");
// const { hash } = require("../utils/bc");
// const { compare } = require("../utils/bc");
const s3 = require("../utils/s3");
const { uploader } = require("../utils/upload");

const { addOutgoing, addIcomings } = require("../sql/db");

/*************************** ROUTES ***************************/

console.log("Hello from Projects");

plan.post("/api/edit-outgoings", //uploader.single("file"), s3.upload, 
                                (req, res) => {

    // TODO: PROJECT ID AND SUM ANPASSEN!!!
    let totalSum = 0;

    console.log("body in post outgoings:", req.body);
    // console.log("body.file in post outgoings:", req.file);

    const data = req.body.userInputOutgoings;
    const projectId = req.body.currentProjectId;

    console.log(data, projectId);
   
    if (!data.quantity) {
        data.quantity = 1;
    }

    // ********************** ADD FILE *******************
   
    // const fileName = req.file.filename;
    // const urlToSaveInDB = `https://s3.amazonaws.com/spicedling/${fileName}`;

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

    const data = req.body.userInputIncome;
    const projectId = req.body.currentProjectId;

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
