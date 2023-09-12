import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducers";
// import { composeWithDevTools } from "@redux-devtools/extension";

export const store = configureStore({
    reducer: rootReducer,
});
