export function projectsReducer(projects = [], action) {
    if (action.type == "projects/receivedProjects") {
        projects = action.payload.projects;
    } else if (action.type =="project/updateProjectFCSumOutgoings") {
      
        const newProjects = projects.map(p => p.id === action.payload.id ? {...p, sum_fc_total: action.payload.sum} : p );

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


export function updateProjectFCSumOutgoings(id, sum) {
    return {
        type: "project/updateProjectFCSumOutgoings",
        payload: { id, sum }
    };
}