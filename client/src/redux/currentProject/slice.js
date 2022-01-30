export function currentProjectReducer(currentProject = null, action) {
    if (action.type == "project/receivedCurrentProject") {
        currentProject = action.payload.project;
        console.log("currentProject im REducer", currentProject);
    } else if (action.type == "project/updateCurrentProject") {
        const newCurrentProject = action.payload.project;
        console.log("newCurrentProject in Reducer: ", newCurrentProject);
        return newCurrentProject;
    } else if (action.type == "project/updateProjectFCSumOutgoings") {
        
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

export function updateProjectFCSumOutgoings(sum) {
    return {
        type: "project/updateProjectFCSumOutgoings",
        payload: { sum },
    };
}