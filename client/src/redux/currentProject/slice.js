export function currentProjectIdReducer(currentProjectId = null, action) {
    if (action.type == "project/receivedCurrentProjectId") {
        currentProjectId = action.payload.id;
        console.log("currentProjectId im REducer", currentProjectId);
    } else if (action.type == "project/updateCurrentProjectId") {
        const newCurrentProjectId = action.payload.id;
        console.log("newCurrentProjectId in Reducer: ", newCurrentProjectId);
        return newCurrentProjectId;
    }
    return currentProjectId;
}

// ********************* ACTIONS ***********************

export function currentProjectIdReceived(id ) {
    return {
        type: "project/receivedCurrentProjectId",
        payload: { id },
    };
}

export function updateCurrentProjectId(id) {
    return {
        type: "project/updateCurrentProjectId",
        payload: { id },
    };
}
