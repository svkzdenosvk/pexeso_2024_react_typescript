import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import secondsReducer from "./secondsSlice";

const rootReducer = combineReducers({
    game: gameReducer,
    time: secondsReducer
});

export default rootReducer;