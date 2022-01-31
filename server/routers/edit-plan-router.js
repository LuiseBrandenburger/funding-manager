const express = require("express");
const plan = express.Router();
// const { validateEmail } = require("../utils/helpers");
// const { hash } = require("../utils/bc");
// const { compare } = require("../utils/bc");
const s3 = require("../utils/s3");
const { uploader } = require("../utils/upload");

const { 
    addOutgoing, 
    getOutgoingsSumFC, 
    updateProjectFCSum,
    updateProjectFinalSum,
    updateProjectSumLeft,
    getOutgoingById,
    updateOutgoingById,
    getOutgoingsSumFinal,
    getApprovedFundingSumById 
} = require("../sql/db");

/*************************** ROUTES ***************************/

plan.post("/api/edit-outgoings", //uploader.single("file"), s3.upload, 
    (req, res) => {

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
                // console.log("rows in add outgoing:", rows[0].id);

                Promise.all([
                    getOutgoingsSumFC(projectId), 
                    getOutgoingsSumFinal(projectId), 
                    getApprovedFundingSumById(projectId), 
                ]).then((result)=> {
                    // console.log("log rows after promis.all", result);
                    // console.log("log rows after promis.all", result[0].rows[0].sum);
                    // console.log("log rows after promis.all", result[1].rows[0].sum);
                    // console.log("log rows after promis.all", result[2].rows[0].approved_funding);

                    let sumCostsFC = result[0].rows[0].sum;
                    let sumCostsFinal = result[1].rows[0].sum;
                    let approvedFunding = result[2].rows[0].approved_funding;
                    let sumLeft = ((approvedFunding * 100) - (sumCostsFinal * 100))/100;

                    Promise.all([
                        updateProjectFCSum(sumCostsFC, projectId), 
                        getOutgoingById(rows[0].id),
                        updateProjectSumLeft(sumLeft, projectId),
                        updateProjectFinalSum(result[1].rows[0].sum, projectId)
                    ]).then((result) =>{
                        // console.log("result in update project forecast sum: ", result[0].rows[0].sum_fc_total);
                        // console.log("log outgoings by id", result[1].rows[0]);
                        // console.log("log sum whats left of funding", result[2].rows[0]);
                        // console.log("log sum all final outgoings", result[3].rows[0]);

                        res.json({ success: true,
                            sumFcTotalCosts: result[0].rows[0].sum_fc_total,
                            addedOutgoing: result[1].rows[0],
                            sumFundingLeft: result[2].rows[0].sum_left,
                            sumTotalCostsPaid: result[3].rows[0].sum_total
                        });

                    });


                });
            })
            .catch((err) => {
                console.log("error adding project: ", err);
                res.json({ success: false });
            });
    });


plan.post("/api/update-outgoings", (req, res) => {

    console.log("body in post outgoings:", req.body);
    // console.log("body.file in post outgoings:", req.file);
    const data = req.body.userInputForUpdate;
    const outgoingId = req.body.clickedItemInTable[0].id;
    console.log("outgoingId:", outgoingId);
    console.log("outgoing data:", data);

    if (!data.quantity) {
        data.quantity = 1;
    }
    if (!data.total){
        data.total = 0;
    }

    updateOutgoingById(
        data.category,
        data.option,
        data.position,
        data.price,
        data.notes,
        data.total,
        data.paidDate,
        outgoingId
    )
        .then(({ rows }) => {
            console.log("rows in update outgoing:", rows);
            console.log("rows were updated, projectId:", rows[0].project_id);

            Promise.all([
                getOutgoingsSumFC(rows[0].project_id), 
                getOutgoingsSumFinal(rows[0].project_id), 
                getApprovedFundingSumById(rows[0].project_id), 
            ]).then((result)=> {
                // console.log("log rows after promis.all", result);
                // console.log("log rows after promis.all", result[0].rows[0].sum);
                // console.log("log rows after promis.all", result[1].rows[0].sum);
                // console.log("log rows after promis.all", result[2].rows[0].approved_funding);

                let sumCostsFC = result[0].rows[0].sum;
                let sumCostsFinal = result[1].rows[0].sum;
                let approvedFunding = result[2].rows[0].approved_funding;
                let sumLeft = ((approvedFunding * 100) - (sumCostsFinal * 100))/100;

                Promise.all([
                    updateProjectFCSum(sumCostsFC, rows[0].project_id), 
                    getOutgoingById(rows[0].id),
                    updateProjectSumLeft(sumLeft, rows[0].project_id),
                    updateProjectFinalSum(result[1].rows[0].sum, rows[0].project_id)
                ]).then((result) =>{
                    // console.log("result in update project forecast sum: ", result[0].rows[0].sum_fc_total);
                    // console.log("log outgoings by id", result[1].rows[0]);
                    // console.log("log sum whats left of funding", result[2].rows[0]);
                    // console.log("log sum all final outgoings", result[3].rows[0]);

                    res.json({ success: true,
                        sumFcTotalCosts: result[0].rows[0].sum_fc_total,
                        addedOutgoing: result[1].rows[0],
                        sumFundingLeft: result[2].rows[0].sum_left,
                        sumTotalCostsPaid: result[3].rows[0].sum_total
                    });

                });

            });
        })
        .catch((err) => {
            console.log("error adding project: ", err);
            res.json({ success: false });
        });
});




/*************************** EXPORT ***************************/

module.exports = plan;
