const express = require("express");
const deleteProject = express.Router();
const {
    deleteOutgoingsByProjectId,
    deleteProjectByProjectId 
} = require("../sql/db");

/*************************** ROUTES ***************************/

deleteProject.post("/delete-project", function (req, res) {

    const projectId = req.body.currentProjectId;

    deleteOutgoingsByProjectId(projectId).then(() => {
        console.log("delete Outgoings Worked");
        deleteProjectByProjectId(projectId).then(()=>{
            console.log("delete Projects Worked");
            res.json({
                success: true,
            });
        }).catch((err)=>{
            console.log(err);
        });
    });
});



/*************************** EXPORT ***************************/

module.exports = deleteProject;
