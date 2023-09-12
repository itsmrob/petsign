import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    userData: null,
    didTryAutoLogin: false,
};

const oAuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authenticate: (state, action) => {
            const { payload } = action;
            state.token = payload.token;
            state.userData = payload.userData;
        },
        setDidTryAutoLogin: (state, action) => {
            state.didTryAutoLogin = true;
        },
    },
});

export const { authenticate, setDidTryAutoLogin } = oAuthSlice.actions; // These action are dispatched in the entire app.

export default oAuthSlice.reducer; //These reducers are being imported in combine reducers (they perform the changes on the state)
