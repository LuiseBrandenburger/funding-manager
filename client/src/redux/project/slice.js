export function projectReducer(projects = [], action) {
    if (action.type == "projects/receivedProjects") {
        projects = action.payload.projects;
    } else if (action.type == "message/receivedWallMessage") {
        const newProjects = [...action.payload.projects, ...projects];
        return newProjects;
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


