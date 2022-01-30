export function projectsReducer(projects = [], action) {
    if (action.type == "projects/receivedProjects") {
        projects = action.payload.projects;
    }
    return projects;
}

// ********************* ACTIONS ***********************

export function projectsReceived(projects) {
    return {
        type: "projects/receivedProjects",
        payload: { projects },
    };
}


