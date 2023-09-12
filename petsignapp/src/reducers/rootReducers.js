import { combineReducers } from "redux";
import oAuthSlice from "../slices/authSlice";

const rootReducer = combineReducers({
    auth: oAuthSlice
});

export default rootReducer;