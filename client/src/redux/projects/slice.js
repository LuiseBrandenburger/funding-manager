export function projectsReducer(projects = [], action) {
    if (action.type == "projects/receivedProjects") {
        projects = action.payload.projects;
    }

    // else if (action.type == "projects/setViewedId") {
    //     const newProjects = [...action.payload.projects, ...projects];
    //     return newProjects;
    // }

    else if (action.type === "projects/setViewedId") {
        const newProjects = projects.map(
            (project) => {
                if (project.id === action.payload.id) {
                    return {
                        ...projects,
                        viewedId: action.payload.id,
                    };
                }
                return project;
            }
        );
        console.log("newProjects:", newProjects);
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

export function setViewedId(id) {
    return {
        type: "projects/setViewedId",
        payload: { id },
    };
}

