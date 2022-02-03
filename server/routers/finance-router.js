const express = require("express");
const finance = express.Router();
const moment = require("moment");


const {
    getOutgoingsByProjectId,
    getIncomingsByProjectId,
    getOutgoingsSumFC,
    getAllOutgoingsByuserId
} = require("../sql/db");

/*************************** ROUTES ***************************/

finance.get("/all-outgoings", function (req, res) {

    getAllOutgoingsByuserId(req.session.userId).then(({ rows }) => {
        // console.log("rows after projects have been fetched: ", rows);

        rows.forEach( row => {
            console.log(row.paiddate);

            if(row.paiddate===null){
            } else {
                let datePaid = moment(row.paiddate).format("YYYY-MM-DD");
                // console.log(datePaid);
                row.paiddate = datePaid;
                // console.log(row.paiddate);
            };
        });

        res.json({
            data: rows,
        });
    });
});


finance.get("/all-outgoings/:id", function (req, res) {
    // console.log("params in request body outgoings: ", req.params.id);

    let projectId = req.params.id;
    getOutgoingsByProjectId(projectId).then(({ rows }) => {
        // console.log("rows after projects have been fetched: ", rows);
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
