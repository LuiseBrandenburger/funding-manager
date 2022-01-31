export function currentProjectReducer(currentProject = null, action) {
    if (action.type == "project/receivedCurrentProject") {
        currentProject = action.payload.project;
        // console.log("currentProject im REducer", currentProject);
    } else if (action.type == "project/updateCurrentProject") {
        const newCurrentProject = action.payload.project;
        // console.log("newCurrentProject in Reducer: ", newCurrentProject);
        return newCurrentProject;
    } else if (action.type == "project/updateProjectFCSumOutgoings") {
        
        // TODO: add logic to update forecast sum in the new project
        // const newCurrentProject = action.payload.project;
        // console.log("newCurrentProject in Reducer: ", newCurrentProject);

        return newCurrentProject;
    }
    return currentProject;
}

// ********************* ACTIONS ***********************

export function currentProjectReceived(project) {
    return {
        type: "project/receivedCurrentProject",
        payload: { project },
    };
}

export function updateCurrentProject(project) {
    return {
        type: "project/updateCurrentProject",
        payload: { project },
    };
}

// export function updateProjectFCSumOutgoings(sum) {
//     return {
//         type: "project/updateProjectFCSumOutgoings",
//         payload: { sum },
//     };
// }

// export function updateProjectsumFundingLeft(sum) {
//     return {
//         type: "project/sumFundingLeft",
//         payload: { sum },
//     };
// }