const express = require("express");
const plan = express.Router();
const moment = require("moment");

const { 
    addOutgoing, 
    getOutgoingsSumFC, 
    updateProjectFCSum,
    updateProjectFinalSum,
    updateProjectSumLeft,
    getOutgoingById,
    updateOutgoingById,
    getOutgoingsSumFinal,
    deleteOutgoing,
    getApprovedFundingSumById,
} = require("../sql/db");

/*************************** ROUTES ***************************/

plan.post("/api/edit-outgoings", (req, res) => {

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
        data.total,
        data.isPaid,
        data.paidDate,
        req.session.userId
    )
        .then(({ rows }) => {

            Promise.all([
                getOutgoingsSumFC(projectId), 
                getOutgoingsSumFinal(projectId), 
                getApprovedFundingSumById(projectId), 
            ]).then((result)=> {
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

    const data = req.body.userInputForUpdate;
    const outgoingId = req.body.clickedItemInTable[0].id;

    if(data.paiddate===null){
    } else {
        let datePaid = moment(data.paiddate).format("YYYY-MM-DD");
        data.paiddate = datePaid;
    }
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
        data.paiddate,
        outgoingId
    )
        .then(({ rows }) => {

            Promise.all([
                getOutgoingsSumFC(rows[0].project_id), 
                getOutgoingsSumFinal(rows[0].project_id), 
                getApprovedFundingSumById(rows[0].project_id), 
            ]).then((result)=> {
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

                    if(result[1].rows.paiddate===null){
                    } else {
                        let datePaid = moment(result[1].rows[0].paiddate).format("YYYY-MM-DD");
                        result[1].rows[0].paiddate = datePaid;
                    }

                    res.json({ success: true,
                        sumFcTotalCosts: result[0].rows[0].sum_fc_total,
                        updatedOutgoing: result[1].rows[0],
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

plan.post("/api/delete-outgoings", (req, res) => {

    const outgoingId = req.body.clickedItemInTable[0].id;

    deleteOutgoing(
        outgoingId
    )
        .then(({ rows }) => {
            Promise.all([
                getOutgoingsSumFC(rows[0].project_id), 
                getOutgoingsSumFinal(rows[0].project_id), 
                getApprovedFundingSumById(rows[0].project_id), 
            ]).then((result)=> {

                let sumCostsFC = result[0].rows[0].sum;
                let sumCostsFinal = result[1].rows[0].sum;
                let approvedFunding = result[2].rows[0].approved_funding;
                let sumLeft = ((approvedFunding * 100) - (sumCostsFinal * 100))/100;

                Promise.all([
                    updateProjectFCSum(sumCostsFC, rows[0].project_id), 
                    updateProjectSumLeft(sumLeft, rows[0].project_id),
                    updateProjectFinalSum(result[1].rows[0].sum, rows[0].project_id)
                ]).then((result) =>{

                    res.json({ success: true,
                        sumFcTotalCosts: result[0].rows[0].sum_fc_total,
                        sumFundingLeft: result[1].rows[0].sum_left,
                        sumTotalCostsPaid: result[2].rows[0].sum_total
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
