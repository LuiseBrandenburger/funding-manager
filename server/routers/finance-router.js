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

        rows.forEach( row => {
            console.log(row.paiddate);

            if(row.paiddate===null){
            } else {
                let datePaid = moment(row.paiddate).format("YYYY-MM-DD");
                row.paiddate = datePaid;
            };
        });
        res.json({
            data: rows,
        });
    });
});


finance.get("/all-outgoings/:id", function (req, res) {

    let projectId = req.params.id;
    getOutgoingsByProjectId(projectId).then(({ rows }) => {
        res.json({
            data: rows,
        });
    });
});


/*************************** EXPORT ***************************/

module.exports = finance;
