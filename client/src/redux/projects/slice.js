export function projectsReducer(projects = [], action) {
    if (action.type == "projects/receivedProjects") {
        projects = action.payload.projects;
    } else if (action.type =="project/updateProjectFCSumOutgoings") {
        // console.log("action payload", action.payload);
        // console.log("action payload", action.payload.id);
        // console.log("action payload", action.payload.sum);
        // console.log("projects zero id", projects[0].id);

        const newProjects = projects.map(
            (project) => {
                if (project.id === action.payload.id) {
                    // console.log("weve got an id that matches");
                    // TODO: BRAINFART WHAT???
                    return {
                        ...project,
                        sum_fc_total: action.payload.sum,
                    };
                }
                return newProjects;
            }
        );
        console.log("new projects:", newProjects);
        // return newProjects;
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


export function updateProjectFCSumOutgoings(id, sum) {
    return {
        type: "project/updateProjectFCSumOutgoings",
        payload: { id, sum }
    };
}