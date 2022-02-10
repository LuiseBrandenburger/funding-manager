import { combineReducers } from "redux";
import { projectsReducer } from "./projects/slice";
import { currentProjectIdReducer } from "./currentProjectId/slice";
import { outgoingsReducer } from "./outgoings/slice";
import { currentOutgoingReducer } from "./currentOutgoing/slice";

const rootReducer = combineReducers({
    projects: projectsReducer,
    currentProjectId: currentProjectIdReducer,
    outgoings: outgoingsReducer,
    currentOutgoing: currentOutgoingReducer,
});

export default rootReducer;
