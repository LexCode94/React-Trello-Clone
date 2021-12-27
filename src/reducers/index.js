import { combineReducers } from "redux";
import listsReducer from "./listReducers";

const allReducers = combineReducers({
    lists: listsReducer,
});

export default allReducers;