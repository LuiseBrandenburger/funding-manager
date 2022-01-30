const express = require("express");
const plan = express.Router();
// const { validateEmail } = require("../utils/helpers");
// const { hash } = require("../utils/bc");
// const { compare } = require("../utils/bc");
const s3 = require("../utils/s3");
const { uploader } = require("../utils/upload");

const { 
    addOutgoing, 
    addIcomings, 
    getOutgoingsSumFC, 
    updateProjectFCSum,
    updateProjectFinalSum,
    getOutgoingsSumFinal,
    getApprovedFundingSumById 
} = require("../sql/db");

/*************************** ROUTES ***************************/

plan.post("/api/edit-outgoings", //uploader.single("file"), s3.upload, 
    (req, res) => {

        // TODO: PROJECT ID AND SUM ANPASSEN!!!
        let totalSum = 0;

        console.log("body in post outgoings:", req.body);
        // console.log("body.file in post outgoings:", req.file);
        const data = req.body.userInputOutgoings;
        const projectId = req.body.currentProjectId;

        if (!data.quantity) {
            data.quantity = 1;
        }
        if (!data.finalSum){
            data.finalSum = 0;
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
            data.isPaid,
            data.paidDate,
            req.session.userId
        )
            .then(({ rows }) => {
                // console.log(rows);

                // i need to get all sums I also need to get the funding sum 
                Promise.all([getOutgoingsSumFC(projectId), getOutgoingsSumFinal(projectId), getApprovedFundingSumById(projectId)]).then((result)=> {
                    console.log("log rows after promis.all", result);
                    console.log("log rows after promis.all", result[0].rows[0].sum);
                    console.log("log rows after promis.all", result[1].rows[0].sum);
                    console.log("log rows after promis.all", result[2].rows[0].approved_funding);

                    console.log(((result[0].rows[0].sum * 100) - (result[2].rows[0].approved_funding * 100))/100);

                })

                // getOutgoingsSumFC(projectId).then((result) => {
                //     console.log(result.rows[0].sum);
                //     updateProjectFCSum(result.rows[0].sum, projectId).then((project) => {
                //         console.log("result in update project sum: ", project.rows[0].sum_fc_total);
                //         res.json({ success: true,
                //             sumFcTotalCosts: project.rows[0].sum_fc_total
                //         });
                //     });
                // });
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
