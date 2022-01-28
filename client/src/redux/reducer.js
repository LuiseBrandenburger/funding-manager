import { combineReducers } from "redux";
import { projectsReducer } from "./projects/slice";

const rootReducer = combineReducers({
    projects: projectsReducer,
    // messages: messagesReducer,
    // wallMessages: wallReducer,
});

export default rootReducer;
