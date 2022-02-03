import { combineReducers } from "redux";
import { projectsReducer } from "./projects/slice";
import { currentProjectIdReducer } from "./currentProjectId/slice";
import { outgoingsReducer } from "./outgoings/slice";
import { incomingsReducer } from "./incomings/slice";
import { currentOutgoingReducer } from "./currentOutgoing/slice";

// import { currentProjectReducer } from "./currentProject/slice";

const rootReducer = combineReducers({
    projects: projectsReducer,
    currentProjectId: currentProjectIdReducer,
    outgoings: outgoingsReducer,
    incomings: incomingsReducer,
    currentOutgoing: currentOutgoingReducer,

    // currentProject: currentProjectReducer
});

export default rootReducer;
