import { combineReducers } from "redux";
import { projectsReducer } from "./projects/slice";
import { currentProjectIdReducer } from "./currentProjectId/slice";
import { outgoingsReducer } from "./outgoings/slice";
import { incomingsReducer } from "./incomings/slice";
import { currentProjectReducer } from "./currentProject/slice";


const rootReducer = combineReducers({
    projects: projectsReducer,
    currentProjectId: currentProjectIdReducer,
    outgoings: outgoingsReducer,
    incomings: incomingsReducer,
    currentProject: currentProjectReducer
});

export default rootReducer;
