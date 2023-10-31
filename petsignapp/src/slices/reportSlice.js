import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postId: null,
    postInformation: null,
    postStatus: null,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        createPost: (state, action) => {
            const { payload } = action;
            state.postId = payload.postId;
            state.postInformation = payload.postInformationl;
            state.postStatus = payload.postStatus;
        },
    },
});

export const { createPost } = postSlice.actions;
export default postSlice.reducer;
