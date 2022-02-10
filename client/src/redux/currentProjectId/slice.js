export function currentProjectIdReducer(currentProjectId = null, action) {
    if (action.type == "project/receivedCurrentProjectId") {
        currentProjectId = action.payload.id;
    } else if (action.type == "project/updateCurrentProjectId") {
        const newCurrentProjectId = action.payload.id;
        return newCurrentProjectId;
    }
    return currentProjectId;
}

// ********************* ACTIONS ***********************

export function currentProjectIdReceived(id) {
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
