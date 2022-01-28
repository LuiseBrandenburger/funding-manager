import { combineReducers } from "redux";
import { projectsReducer } from "./projects/slice";
import { currentProjectIdReducer } from "./currentProject/slice";

const rootReducer = combineReducers({
    projects: projectsReducer,
    currentProjectId: currentProjectIdReducer,
    // wallMessages: wallReducer,
});

export default rootReducer;
