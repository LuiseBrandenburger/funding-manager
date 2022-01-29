import { combineReducers } from "redux";
import { projectsReducer } from "./projects/slice";
import { currentProjectIdReducer } from "./currentProject/slice";
import { outgoingsReducer } from "./outgoings/slice";
import { incomingsReducer } from "./incomings/slice";


const rootReducer = combineReducers({
    projects: projectsReducer,
    currentProjectId: currentProjectIdReducer,
    outgoings: outgoingsReducer,
    incomings: incomingsReducer,
});

export default rootReducer;
