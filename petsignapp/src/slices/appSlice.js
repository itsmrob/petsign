import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: null,
    loading: false,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setError, clearError, setLoading } = appSlice.actions;
export default appSlice.reducer;
